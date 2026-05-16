#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

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
  const p = path.join(__dirname, dir);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

console.log('✅ Directories created!');
