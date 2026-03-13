// Create admin user using Medusa's internal API
const path = require('path');
const { asValue } = require('awilix');

async function createAdminViaMedusaAPI() {
  console.log('🔧 Creating admin user via Medusa API...\n');

  try {
    // Load Medusa's loaders
    const express = require('express');
    const { default: loaders } = require('@medusajs/medusa/dist/loaders');
    const { default: medusaConfig } = require('./medusa-config');

    const app = express();
    
    console.log('📦 Loading Medusa...');
    const { container } = await loaders({
      directory: path.resolve(__dirname),
      expressApp: app,
      isTest: false,
    });

    console.log('✅ Medusa loaded\n');

    // Get the user service
    const userService = container.resolve('userService');
    
    console.log('👤 Creating admin user...');
    
    // Delete existing users first
    try {
      const existingUsers = await userService.list({});
      for (const user of existingUsers) {
        await userService.delete(user.id);
        console.log(`🗑️  Deleted user: ${user.email}`);
      }
    } catch (e) {
      console.log('ℹ️  No existing users to delete');
    }

    // Create new admin user
    const adminUser = await userService.create({
      email: 'admin@medusa.com',
      password: 'admin123',
      role: 'admin',
      first_name: 'Admin',
      last_name: 'User',
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('================================');
    console.log('📧 Email:    admin@medusa.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:  ' + adminUser.id);
    console.log('👤 Role:     ' + adminUser.role);
    console.log('🌐 Login at: http://localhost:7001');
    console.log('================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

require('dotenv').config();
createAdminViaMedusaAPI();
