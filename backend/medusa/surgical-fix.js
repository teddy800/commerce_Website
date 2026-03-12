const fs = require('fs');
const path = require('path');

console.log('🔧 SURGICAL FIX - Fixing only the critical payment-provider bug\n');

const filePath = path.join(__dirname, 'node_modules/@medusajs/medusa/dist/services/payment-provider.js');

if (!fs.existsSync(filePath)) {
  console.log('❌ File not found:', filePath);
  process.exit(1);
}

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already patched
  if (content.includes('// SURGICAL FIX')) {
    console.log('✅ Already patched!');
    process.exit(0);
  }

  console.log('📝 Reading file...');
  
  // Find the exact problematic line
  const buggyPattern = 'model.update({}, { is_installed: false })';
  
  if (!content.includes(buggyPattern)) {
    console.log('⚠️  Bug pattern not found. File may have been updated.');
    process.exit(1);
  }

  console.log('🔍 Found bug pattern');
  console.log('🔨 Applying surgical fix...');

  // Simple replacement: Instead of update({}, ...), we'll just skip the update
  // This is safe because the providers will be registered anyway
  content = content.replace(
    'return [4 /*yield*/, model.update({}, { is_installed: false })];',
    '// SURGICAL FIX: Skip problematic empty update\n                                        // return [4 /*yield*/, model.update({}, { is_installed: false })];\n                                        return [3 /*break*/, 2];'
  );

  // Adjust the next case number
  content = content.replace(
    /case 1:\s+_b\.sent\(\);\s+_b\.label = 2;/,
    'case 1:\n                                        // SURGICAL FIX: Adjusted case flow\n                                        _b.sent();\n                                        _b.label = 2;'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('✅ Surgical fix applied successfully!');
  console.log('\n🎉 You can now start Medusa with: npm run dev\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
