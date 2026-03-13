// Direct database admin user creation
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  console.log('🔧 Creating Medusa admin user directly in database...');
  
  // Parse the DATABASE_URL from .env
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://medusa_db_w2b5_user:mHI05fObXfGwCIt0ZXhMAJ68N5HBltnh@dpg-d6pbjouuk2gs73cr7irg-a.oregon-postgres.render.com/medusa_db_w2b5?sslmode=require';
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT * FROM "user" WHERE email = $1',
      ['test@admin.com']
    );

    if (existingUser.rows.length > 0) {
      console.log('ℹ️  Admin user already exists!');
      console.log('📧 Email: test@admin.com');
      console.log('🔑 Password: admin123');
      console.log('🌐 Login at: http://localhost:7001');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    const result = await client.query(`
      INSERT INTO "user" (id, email, password_hash, role, first_name, last_name, created_at, updated_at)
      VALUES (
        'user_' || substr(md5(random()::text), 0, 25),
        $1,
        $2,
        'admin',
        'Admin',
        'User',
        NOW(),
        NOW()
      )
      RETURNING id, email
    `, ['test@admin.com', hashedPassword]);

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: test@admin.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:7001');
    console.log('👤 User ID:', result.rows[0].id);

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('relation "user" does not exist')) {
      console.log('');
      console.log('🔧 Database tables not created yet. Run migrations first:');
      console.log('   npm run migrations');
    }
  } finally {
    await client.end();
  }
}

// Load environment variables
require('dotenv').config();
createAdminUser();