// Debug what's actually in the database
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function debugUser() {
  console.log('🔍 Debugging Medusa admin user...');
  
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://medusa_db_w2b5_user:mHI05fObXfGwCIt0ZXhMAJ68N5HBltnh@dpg-d6pbjouuk2gs73cr7irg-a.oregon-postgres.render.com/medusa_db_w2b5?sslmode=require';
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check what users exist
    const users = await client.query('SELECT id, email, password_hash, role, first_name, last_name FROM "user"');
    console.log('\n📋 Users in database:');
    users.rows.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Name: ${user.first_name} ${user.last_name}`);
      console.log(`  Password Hash: ${user.password_hash ? user.password_hash.substring(0, 20) + '...' : 'NULL'}`);
      console.log('');
    });

    // Test password verification
    const testUser = users.rows.find(u => u.email === 'test@admin.com');
    if (testUser && testUser.password_hash) {
      const isValid = await bcrypt.compare('admin123', testUser.password_hash);
      console.log(`🔐 Password verification for test@admin.com: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
      
      if (!isValid) {
        console.log('🔧 Updating password hash...');
        const newHash = await bcrypt.hash('admin123', 10);
        await client.query('UPDATE "user" SET password_hash = $1 WHERE email = $2', [newHash, 'test@admin.com']);
        console.log('✅ Password hash updated!');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

require('dotenv').config();
debugUser();