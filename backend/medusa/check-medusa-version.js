// Check Medusa version and setup capabilities
const fs = require('fs');
const path = require('path');

console.log('🔍 MEDUSA VERSION CHECK\n');
console.log('=======================\n');

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  console.log('📦 Installed Medusa packages:\n');
  
  const medusaPackages = Object.entries(packageJson.dependencies || {})
    .filter(([name]) => name.includes('medusa'))
    .concat(Object.entries(packageJson.devDependencies || {})
      .filter(([name]) => name.includes('medusa')));
  
  medusaPackages.forEach(([name, version]) => {
    console.log(`  ${name}: ${version}`);
  });
  
  console.log('\n=======================\n');
  
  // Check for @medusajs/medusa version
  const medusaCore = packageJson.dependencies['@medusajs/medusa'];
  
  if (medusaCore) {
    console.log('📋 Medusa Core Version:', medusaCore);
    
    // Parse version
    const versionMatch = medusaCore.match(/(\d+)\.(\d+)\.(\d+)/);
    if (versionMatch) {
      const [, major, minor] = versionMatch;
      console.log(`   Major: ${major}, Minor: ${minor}\n`);
      
      // Check if setup wizard is available
      if (parseInt(major) >= 1 && parseInt(minor) >= 8) {
        console.log('✅ Your Medusa version SHOULD support the setup wizard\n');
        console.log('📝 The setup wizard appears when:');
        console.log('   1. No users exist in the database');
        console.log('   2. You visit http://localhost:7001 for the first time');
        console.log('   3. Browser cache is cleared\n');
      } else {
        console.log('⚠️  Your Medusa version might NOT have the setup wizard\n');
        console.log('📝 You need to create users via CLI:');
        console.log('   npx medusa user -e admin@medusa.com -p admin123\n');
      }
    }
  }
  
  // Check for admin package
  const medusaAdmin = packageJson.dependencies['@medusajs/admin'];
  if (medusaAdmin) {
    console.log('🎨 Medusa Admin Version:', medusaAdmin, '\n');
  }
  
  console.log('=======================\n');
  console.log('📝 RECOMMENDED ACTIONS:\n');
  console.log('1. Run: .\\trigger-setup-wizard.ps1');
  console.log('2. If no setup wizard appears, run: npx medusa user -e admin@medusa.com -p admin123');
  console.log('3. Then start Medusa: npm run dev\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
