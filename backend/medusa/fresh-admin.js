// Delete and recreate admin user
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function createFreshAdmin() {
  console.log('🔧 Creating fresh admin user...');
  
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://medusa_db_w2b5_user:mHI05fObXfGwCIt0ZXhMAJ68N5HBltnh@dpg-d6pbjouuk2gs73cr7irg-a.oregon-postgres.render.com/medusa_db_w2b5?sslmode=require';
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Delete existing user
    await client.query('DELETE FROM "user" WHERE email = $1', ['test@admin.com']);
    console.log('🗑️  Deleted existing user');

    // Create fresh admin user with proper hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    
    await client.query(`
      INSERT INTO "user" (id, email, password_hash, role, first_name, last_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    `, [userId, 'test@admin.com', hashedPassword, 'admin', 'Admin', 'User']);

    console.log('✅ Fresh admin user created!');
    console.log('📧 Email: test@admin.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:', userId);
    console.log('🌐 Login at: http://localhost:7001');

    // Verify the password works
    const isValid = await bcrypt.compare('admin123', hashedPassword);
    console.log('🔐 Password verification:', isValid ? '✅ VALID' : '❌ INVALID');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

require('dotenv').config();
createFreshAdmin();