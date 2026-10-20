const fs = require('node:fs');
const path = require('node:path');
const packageFile = require.resolve('braces/package.json');
const { version } = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
// Upstream has no release for GHSA-vfj7-8cjw-p6xm. Fail closed on a version change
// so this temporary, narrowly scoped patch is reviewed rather than silently skipped.
if (version !== '3.0.3') throw new Error(`Review braces depth patch for ${version}`);
const marker = '/* site: bounded braces recursion */';
const guard = `${marker}\n    if (depth > 128) throw new SyntaxError('Brace nesting exceeds the site safety limit (128)');`;
const changes = {
  'parse.js': [[
    'while (index < length) {\n    block =',
    `while (index < length) {\n    ${marker}\n    if (stack.length > 128) throw new SyntaxError('Brace nesting exceeds the site safety limit (128)');\n    block =`
  ]],
  'compile.js': [
    ['const walk = (node, parent = {}) => {', `const walk = (node, parent = {}, depth = 0) => {\n    ${guard}`],
    ['walk(child, node)', 'walk(child, node, depth + 1)']
  ],
  'expand.js': [
    ['const walk = (node, parent = {}) => {', `const walk = (node, parent = {}, depth = 0) => {\n    ${guard}`],
    ['walk(child, node)', 'walk(child, node, depth + 1)']
  ],
  'stringify.js': [
    ['const stringify = (node, parent = {}) => {', `const stringify = (node, parent = {}, depth = 0) => {\n    ${guard}`],
    ['stringify(child)', 'stringify(child, {}, depth + 1)']
  ],
};
for (const [name, replacements] of Object.entries(changes)) {
  const file = path.join(path.dirname(packageFile), 'lib', name);
  let source = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  if (source.includes(marker)) continue;
  for (const [before, after] of replacements) {
    if (source.split(before).length !== 2) throw new Error(`Unexpected braces source: ${name}`);
    source = source.replace(before, after);
  }
  fs.writeFileSync(file, source);
}
console.log('Applied braces 3.0.3 nesting guard to parser and AST walkers.');
