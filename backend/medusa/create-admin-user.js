const { createConnection } = require('typeorm');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  try {
    // Connect to the database
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['node_modules/@medusajs/medusa/dist/models/*.js'],
      synchronize: false,
    });

    console.log('✅ Connected to database');

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if user already exists
    const existingUser = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      ['admin@medusa.com']
    );

    if (existingUser.length > 0) {
      console.log('ℹ️  User already exists, updating password...');
      await connection.query(
        'UPDATE "user" SET password_hash = $1 WHERE email = $2',
        [hashedPassword, 'admin@medusa.com']
      );
      console.log('✅ Password updated successfully!');
    } else {
      console.log('📝 Creating new admin user...');
      await connection.query(
        `INSERT INTO "user" (email, password_hash, role, first_name, last_name, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        ['admin@medusa.com', hashedPassword, 'admin', 'Admin', 'User']
      );
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n🎉 You can now login with:');
    console.log('   Email: admin@medusa.com');
    console.log('   Password: admin123');
    console.log('\n🌐 Login at: http://localhost:7001/login');

    await connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config();

createAdminUser();
