// Seed admin user using Medusa's seeding system
const { 
  dataSource,
} = require("@medusajs/medusa/dist/loaders/database")
const { 
  User,
} = require("@medusajs/medusa/dist/models")

const seedAdminUser = async () => {
  console.log('🔧 Seeding admin user...');
  
  try {
    const manager = dataSource.manager
    
    // Check if admin user exists
    const existingUser = await manager.findOne(User, {
      where: { email: "test@admin.com" }
    })

    if (existingUser) {
      console.log('ℹ️  Admin user already exists!');
      console.log('📧 Email: test@admin.com');
      console.log('🔑 Password: admin123');
      return;
    }

    // Create admin user
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = manager.create(User, {
      email: "test@admin.com",
      password_hash: hashedPassword,
      role: "admin",
      first_name: "Admin",
      last_name: "User",
    })

    await manager.save(adminUser)
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: test@admin.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:7001');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

seedAdminUser();