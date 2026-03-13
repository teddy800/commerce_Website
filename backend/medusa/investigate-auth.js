// Deep investigation of authentication issue
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function investigateAuth() {
  console.log('🔍 DEEP AUTHENTICATION INVESTIGATION\n');
  console.log('=====================================\n');
  
  const databaseUrl = process.env.DATABASE_URL;
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Step 1: Check all tables related to users
    console.log('📊 Step 1: Checking database schema...\n');
    
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%user%'
      ORDER BY table_name
    `);
    
    console.log('Tables related to users:');
    tables.rows.forEach(t => console.log(`  - ${t.table_name}`));
    console.log('');

    // Step 2: Check user table structure
    console.log('📋 Step 2: User table structure...\n');
    
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'user'
      ORDER BY ordinal_position
    `);
    
    console.log('User table columns:');
    columns.rows.forEach(c => {
      console.log(`  - ${c.column_name} (${c.data_type}) ${c.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    console.log('');

    // Step 3: Check all users
    console.log('👥 Step 3: All users in database...\n');
    
    const users = await client.query('SELECT * FROM "user"');
    
    if (users.rows.length === 0) {
      console.log('⚠️  NO USERS FOUND IN DATABASE!\n');
      console.log('This is the problem - the user was not created.\n');
    } else {
      console.log(`Found ${users.rows.length} user(s):\n`);
      
      for (const user of users.rows) {
        console.log(`User: ${user.email}`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  First Name: ${user.first_name}`);
        console.log(`  Last Name: ${user.last_name}`);
        console.log(`  Password Hash: ${user.password_hash ? user.password_hash.substring(0, 30) + '...' : 'NULL'}`);
        console.log(`  API Token: ${user.api_token || 'NULL'}`);
        console.log(`  Created: ${user.created_at}`);
        console.log(`  Updated: ${user.updated_at}`);
        
        // Test password
        if (user.password_hash) {
          console.log('\n  🔐 Testing passwords:');
          
          const passwords = ['admin123', 'Admin123', 'ADMIN123', 'supersecret'];
          
          for (const pwd of passwords) {
            try {
              const isValid = await bcrypt.compare(pwd, user.password_hash);
              if (isValid) {
                console.log(`    ✅ "${pwd}" - VALID`);
              } else {
                console.log(`    ❌ "${pwd}" - invalid`);
              }
            } catch (e) {
              console.log(`    ⚠️  "${pwd}" - error: ${e.message}`);
            }
          }
        }
        console.log('');
      }
    }

    // Step 4: Check if there's a separate password table
    console.log('🔑 Step 4: Checking for separate password storage...\n');
    
    try {
      const passwordTable = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND (table_name LIKE '%password%' OR table_name LIKE '%auth%')
      `);
      
      if (passwordTable.rows.length > 0) {
        console.log('Found authentication-related tables:');
        passwordTable.rows.forEach(t => console.log(`  - ${t.table_name}`));
        
        // Check each table
        for (const table of passwordTable.rows) {
          try {
            const data = await client.query(`SELECT * FROM "${table.table_name}" LIMIT 5`);
            console.log(`\n  ${table.table_name} (${data.rows.length} rows):`);
            if (data.rows.length > 0) {
              console.log('    Columns:', Object.keys(data.rows[0]).join(', '));
            }
          } catch (e) {
            console.log(`    Error reading: ${e.message}`);
          }
        }
      } else {
        console.log('No separate password tables found.');
      }
    } catch (e) {
      console.log('Error checking password tables:', e.message);
    }
    console.log('');

    // Step 5: Check Medusa configuration
    console.log('⚙️  Step 5: Checking Medusa configuration...\n');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
    console.log('COOKIE_SECRET:', process.env.COOKIE_SECRET ? '✅ Set' : '❌ Not set');
    console.log('');

    // Step 6: Recommendations
    console.log('=====================================');
    console.log('📝 RECOMMENDATIONS:\n');
    
    if (users.rows.length === 0) {
      console.log('1. ❌ NO USERS EXIST - User creation failed');
      console.log('   Solution: Check the output when running npx medusa user');
      console.log('');
    }
    
    console.log('2. Try creating user while Medusa is running:');
    console.log('   - Start Medusa: npm run dev');
    console.log('   - In another terminal: npx medusa user -e admin@medusa.com -p admin123');
    console.log('');
    
    console.log('3. Check Medusa logs for authentication errors');
    console.log('');
    
    console.log('4. Try the Medusa admin invite flow:');
    console.log('   - Go to http://localhost:7001');
    console.log('   - Look for "Create account" or "Invite" option');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
  } finally {
    await client.end();
  }
}

require('dotenv').config();
investigateAuth();
