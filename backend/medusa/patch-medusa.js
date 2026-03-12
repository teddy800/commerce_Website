const fs = require('fs');
const path = require('path');

console.log('🔧 Patching Medusa core files to fix empty criteria bug...\n');

const filesToPatch = [
  'node_modules/@medusajs/medusa/dist/services/fulfillment-provider.js',
  'node_modules/@medusajs/medusa/dist/services/tax-provider.js',
];

filesToPatch.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Pattern to find: model.update({}, { is_installed: false })
  const buggyPattern = /return \[4 \/\*yield\*\/, model\.update\(\{\}, \{ is_installed: false \}\)\];/g;
  
  if (!content.match(buggyPattern)) {
    console.log(`✅ ${filePath} - Already patched or no bug found`);
    return;
  }

  // Replace with safe version that checks for existing providers first
  content = content.replace(
    buggyPattern,
    `// FIX: Get all providers first, then update them individually
                                        return [4 /*yield*/, model.find()];
                                    case 1:
                                        var existingProviders = _a.sent();
                                        if (existingProviders.length > 0) {
                                            return [4 /*yield*/, model.update(existingProviders.map(function (p) { return p.id; }), { is_installed: false })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        return [4 /*yield*/, (0, utils_1.promiseAll)(providerIds.map(function (providerId) { return __awaiter(_this, void 0, void 0, function () {`
  );

  // Also need to update the next case number
  content = content.replace(
    /case 1:\s+_a\.sent\(\);\s+return \[4 \/\*yield\*\/, \(0, utils_1\.promiseAll\)\(providerIds\.map/g,
    ''
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ ${filePath} - Patched successfully`);
});

console.log('\n✅ All patches applied!');
