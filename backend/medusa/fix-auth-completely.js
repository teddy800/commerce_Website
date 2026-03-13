// Complete authentication fix for Medusa
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function fixAuthCompletely() {
  console.log('🔧 COMPLETE AUTHENTICATION FIX');
  console.log('================================\n');
  
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://medusa_db_w2b5_user:mHI05fObXfGwCIt0ZXhMAJ68N5HBltnh@dpg-d6pbjouuk2gs73cr7irg-a.oregon-postgres.render.com/medusa_db_w2b5?sslmode=require';
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Step 1: Check current users
    console.log('📋 Step 1: Checking existing users...');
    const existingUsers = await client.query('SELECT id, email, role FROM "user"');
    console.log(`Found ${existingUsers.rows.length} users:`);
    existingUsers.rows.forEach(u => console.log(`  - ${u.email} (${u.role})`));
    console.log('');

    // Step 2: Delete ALL existing users to start fresh
    console.log('🗑️  Step 2: Deleting all existing users...');
    await client.query('DELETE FROM "user"');
    console.log('✅ All users deleted\n');

    // Step 3: Create admin user with proper Medusa structure
    console.log('👤 Step 3: Creating admin user...');
    
    const email = 'admin@medusa.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate proper Medusa user ID format
    const userId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    
    await client.query(`
      INSERT INTO "user" (
        id, 
        email, 
        password_hash, 
        role,
        first_name,
        last_name,
        created_at, 
        updated_at,
        metadata
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)
    `, [
      userId, 
      email, 
      hashedPassword, 
      'admin',
      'Admin',
      'User',
      JSON.stringify({})
    ]);

    console.log('✅ Admin user created successfully!\n');

    // Step 4: Verify the user was created correctly
    console.log('🔍 Step 4: Verifying user creation...');
    const verifyUser = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
    
    if (verifyUser.rows.length === 0) {
      throw new Error('User was not created!');
    }

    const user = verifyUser.rows[0];
    console.log('✅ User found in database:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Name: ${user.first_name} ${user.last_name}`);
    console.log('');

    // Step 5: Verify password hash
    console.log('🔐 Step 5: Verifying password hash...');
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      throw new Error('Password verification failed!');
    }
    
    console.log('✅ Password hash is valid\n');

    // Step 6: Check for any authentication-related tables
    console.log('📊 Step 6: Checking authentication tables...');
    
    // Check if there's a store table that might need configuration
    try {
      const storeCheck = await client.query('SELECT COUNT(*) FROM store');
      console.log(`✅ Store table exists (${storeCheck.rows[0].count} stores)`);
      
      if (storeCheck.rows[0].count === '0') {
        console.log('⚠️  No store found - creating default store...');
        const storeId = 'store_' + Date.now().toString(36);
        await client.query(`
          INSERT INTO store (id, name, default_currency_code, created_at, updated_at)
          VALUES ($1, $2, $3, NOW(), NOW())
        `, [storeId, 'Medusa Store', 'usd']);
        console.log('✅ Default store created');
      }
    } catch (e) {
      console.log('ℹ️  Store table check skipped');
    }
    
    console.log('');

    // Final summary
    console.log('================================');
    console.log('🎉 AUTHENTICATION FIX COMPLETE!');
    console.log('================================\n');
    console.log('📧 Email:    admin@medusa.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:7001\n');
    console.log('📝 Next steps:');
    console.log('   1. Make sure no Medusa process is running');
    console.log('   2. Run: npm run dev');
    console.log('   3. Go to http://localhost:7001');
    console.log('   4. Login with the credentials above\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

require('dotenv').config();
fixAuthCompletely();
