const { MedusaContainer } = require('@medusajs/medusa');
const { createConnection } = require('typeorm');

async function createAdminUser() {
  console.log('🔧 Creating Medusa admin user...');
  
  try {
    // Create database connection
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['node_modules/@medusajs/medusa/dist/models/*.js'],
      migrations: ['node_modules/@medusajs/medusa/dist/migrations/*.js'],
      logging: false,
    });

    const userRepository = connection.getRepository('User');
    
    // Check if admin user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'test@admin.com' }
    });

    if (existingUser) {
      console.log('✅ Admin user already exists!');
      console.log('📧 Email: test@admin.com');
      console.log('🔑 Password: admin123');
      await connection.close();
      return;
    }

    // Create new admin user
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = userRepository.create({
      email: 'test@admin.com',
      password_hash: hashedPassword,
      role: 'admin',
      first_name: 'Admin',
      last_name: 'User',
    });

    await userRepository.save(adminUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: test@admin.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:7001');
    
    await connection.close();
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

createAdminUser();