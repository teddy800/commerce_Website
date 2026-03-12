const fs = require('fs');
const path = require('path');

console.log('🔧 COMPREHENSIVE MEDUSA FIX - Patching all core bugs...\n');

// All files that need to be patched
const filesToPatch = [
  'node_modules/@medusajs/medusa/dist/services/payment-provider.js',
  'node_modules/@medusajs/medusa/dist/services/notification.js',
  'node_modules/@medusajs/medusa/dist/services/fulfillment-provider.js',
  'node_modules/@medusajs/medusa/dist/services/tax-provider.js',
];

let successCount = 0;
let failCount = 0;

filesToPatch.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    failCount++;
    return;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Check if already patched
    if (content.includes('// FIX: Get all providers first')) {
      console.log(`✅ ${path.basename(filePath)} - Already patched`);
      successCount++;
      return;
    }

    // Check if file has the bug
    if (!content.includes('model.update({}, { is_installed: false })') && 
        !content.includes('fulfillmentProviderRepo.update({}, { is_installed: false })')) {
      console.log(`ℹ️  ${path.basename(filePath)} - No bug found`);
      successCount++;
      return;
    }

    console.log(`🔨 Patching ${path.basename(filePath)}...`);

    // Replace the buggy pattern with a safe version
    // This works for all service files with the same bug pattern
    
    // Pattern 1: For payment-provider, notification, tax-provider
    content = content.replace(
      /(\s+)(model|fulfillmentProviderRepo) = .*?\.withRepository\(.*?\);\s+return \[4 \/\*yield\*\/, \2\.update\(\{\}, \{ is_installed: false \}\)\];/g,
      function(match, indent, repoVar) {
        return `${indent}${repoVar} = transactionManager.withRepository(this.${repoVar === 'model' ? 'paymentProviderRepository_' : 'fulfillmentProviderRepository_'});
${indent}// FIX: Get all providers first, then update them individually
${indent}return [4 /*yield*/, ${repoVar}.find()];`;
      }
    );

    // Add the continuation logic after find()
    content = content.replace(
      /(case 1:\s+)(_[ab])\.sent\(\);\s+(_[ab])\.label = 2;/g,
      function(match, caseLabel, sentVar, labelVar) {
        return `${caseLabel}var existingProviders = ${sentVar}.sent();
                                        if (existingProviders.length > 0) {
                                            return [4 /*yield*/, model.update(existingProviders.map(function (p) { return p.id; }), { is_installed: false })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        ${sentVar}.sent();
                                        ${labelVar}.label = 3;`;
      }
    );

    // Update case numbers in the rest of the function
    // This is a simplified approach - increment all case numbers after case 2 by 1
    const lines = content.split('\n');
    let inFunction = false;
    let caseNumberOffset = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('registerInstalledProviders')) {
        inFunction = true;
      }
      
      if (inFunction && lines[i].includes('case 2:') && lines[i].includes('_b.sent()')) {
        caseNumberOffset = 1;
      }
      
      if (caseNumberOffset > 0 && inFunction) {
        // Update case numbers
        lines[i] = lines[i].replace(/case (\d+):/g, (match, num) => {
          const caseNum = parseInt(num);
          if (caseNum >= 2) {
            return `case ${caseNum + 1}:`;
          }
          return match;
        });
        
        // Update break references
        lines[i] = lines[i].replace(/\[3 \/\*break\*\/, (\d+)\]/g, (match, num) => {
          const breakNum = parseInt(num);
          if (breakNum >= 2) {
            return `[3 /*break*/, ${breakNum + 1}]`;
          }
          return match;
        });
      }
      
      if (inFunction && lines[i].includes('return [2 /*return*/]')) {
        inFunction = false;
        caseNumberOffset = 0;
      }
    }
    
    content = lines.join('\n');

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ ${path.basename(filePath)} - Patched successfully`);
      successCount++;
    } else {
      console.log(`⚠️  ${path.basename(filePath)} - No changes made`);
      failCount++;
    }

  } catch (error) {
    console.error(`❌ ${path.basename(filePath)} - Error: ${error.message}`);
    failCount++;
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ Successfully patched: ${successCount} files`);
console.log(`❌ Failed: ${failCount} files`);
console.log(`${'='.repeat(50)}\n`);

if (failCount === 0) {
  console.log('🎉 All patches applied successfully!');
  console.log('You can now start Medusa with: npm run dev\n');
} else {
  console.log('⚠️  Some patches failed. Please check the errors above.\n');
  process.exit(1);
}
