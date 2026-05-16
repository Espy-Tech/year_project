const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// Create directories
const dirs = [
  'lib',
  'app',
  'components',
  'components/ui',
  'public',
  'public/assets'
];

dirs.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

console.log('All directories created successfully!');
