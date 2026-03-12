const fs = require('fs');
const path = require('path');

console.log('🔧 SURGICAL FIX - Fixing all provider bugs\n');

const files = [
  'node_modules/@medusajs/medusa/dist/services/payment-provider.js',
  'node_modules/@medusajs/medusa/dist/services/notification.js',
  'node_modules/@medusajs/medusa/dist/services/fulfillment-provider.js',
  'node_modules/@medusajs/medusa/dist/services/tax-provider.js',
];

let successCount = 0;
let skipCount = 0;

files.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);
  const fileName = path.basename(filePath);
  
  console.log(`\n📄 Processing ${fileName}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already patched
    if (content.includes('// SURGICAL FIX')) {
      console.log(`  ✅ Already patched`);
      skipCount++;
      return;
    }

    // Check for the bug patterns
    const hasBug1 = content.includes('model.update({}, { is_installed: false })');
    const hasBug2 = content.includes('fulfillmentProviderRepo.update({}, { is_installed: false })');
    
    if (!hasBug1 && !hasBug2) {
      console.log(`  ℹ️  No bug found`);
      skipCount++;
      return;
    }

    console.log(`  🔍 Found bug pattern`);
    console.log(`  🔨 Applying fix...`);

    // Fix pattern 1: model.update
    if (hasBug1) {
      content = content.replace(
        'return [4 /*yield*/, model.update({}, { is_installed: false })];',
        '// SURGICAL FIX: Skip problematic empty update\n                                        // return [4 /*yield*/, model.update({}, { is_installed: false })];\n                                        return [3 /*break*/, 2];'
      );
    }

    // Fix pattern 2: fulfillmentProviderRepo.update
    if (hasBug2) {
      content = content.replace(
        'return [4 /*yield*/, fulfillmentProviderRepo.update({}, { is_installed: false })];',
        '// SURGICAL FIX: Skip problematic empty update\n                                        // return [4 /*yield*/, fulfillmentProviderRepo.update({}, { is_installed: false })];\n                                        return [3 /*break*/, 2];'
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`  ✅ Fixed successfully`);
    successCount++;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`⏭️  Skipped (already fixed): ${skipCount} files`);
console.log(`${'='.repeat(60)}\n`);

if (successCount > 0 || skipCount === files.length) {
  console.log('🎉 All fixes applied!');
  console.log('\n📝 Next steps:');
  console.log('   1. cd backend/medusa');
  console.log('   2. npm run migrations');
  console.log('   3. npm run dev\n');
} else {
  console.log('⚠️  No fixes were applied. Check the output above.\n');
}
