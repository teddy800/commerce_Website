// Simple admin user creation using Medusa CLI approach
const { execSync } = require('child_process');

console.log('🔧 Creating Medusa admin user...');

try {
  // Use Medusa's built-in user creation
  const command = 'npx medusa user -e test@admin.com -p admin123';
  
  console.log('Running:', command);
  const result = execSync(command, { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Admin user created successfully!');
  console.log('📧 Email: test@admin.com');
  console.log('🔑 Password: admin123');
  console.log('🌐 Login at: http://localhost:7001');
  
} catch (error) {
  console.log('ℹ️  User might already exist or there was an issue.');
  console.log('📧 Try logging in with: test@admin.com');
  console.log('🔑 Password: admin123');
  console.log('🌐 At: http://localhost:7001');
}