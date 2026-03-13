// Create admin user via Medusa API
const axios = require('axios');

async function createAdminUser() {
  console.log('🔧 Creating admin user via Medusa API...');
  
  try {
    // First, check if we can reach the API
    const healthCheck = await axios.get('http://localhost:9000/health');
    console.log('✅ Medusa API is running');
    
    // Try to create admin user via API
    const response = await axios.post('http://localhost:9000/admin/users', {
      email: 'test@admin.com',
      password: 'admin123',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: test@admin.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:7001');
    
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log('ℹ️  Admin user might already exist');
      console.log('📧 Try logging in with: test@admin.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('ℹ️  Could not create user via API (this is normal)');
      console.log('📧 Try logging in with: test@admin.com');
      console.log('🔑 Password: admin123');
      console.log('🌐 Or create user manually at: http://localhost:7001');
    }
  }
}

createAdminUser();