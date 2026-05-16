#!/usr/bin/env node

/**
 * Numerical Integration Platform - Full Setup & Launch
 * Installs dependencies and starts dev server automatically
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectDir = 'c:\\Users\\САМАКЕ ИБРАНИМ\\Desktop\\projet_fin_anne';

console.log('\n' + '='.repeat(60));
console.log('🚀 Numerical Integration Platform');
console.log('Setting Up & Launching Development Server');
console.log('='.repeat(60) + '\n');

try {
  // Step 1: Change to project directory
  console.log('📁 Working directory:', projectDir);
  process.chdir(projectDir);
  console.log('✅ Changed to project directory\n');

  // Step 2: Clean npm cache
  console.log('🧹 Cleaning npm cache...');
  try {
    execSync('npm cache clean --force', { stdio: 'ignore' });
    console.log('✅ Cache cleaned\n');
  } catch (e) {
    console.log('⚠️  Cache clean skipped\n');
  }

  // Step 3: Remove old node_modules
  console.log('🗑️  Removing old node_modules...');
  const nodeModulesPath = path.join(projectDir, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    try {
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      console.log('✅ Old modules removed\n');
    } catch (e) {
      console.log('⚠️  Could not remove old modules, continuing...\n');
    }
  } else {
    console.log('✅ No old modules to remove\n');
  }

  // Step 4: Install dependencies
  console.log('📦 Installing dependencies...');
  console.log('(This may take 2-5 minutes)\n');
  
  try {
    execSync('npm install --legacy-peer-deps --no-optional', { stdio: 'inherit' });
    console.log('\n✅ Dependencies installed successfully\n');
  } catch (e) {
    console.error('❌ Installation failed:', e.message);
    process.exit(1);
  }

  // Step 5: Verify Next.js installation
  console.log('🔍 Verifying Next.js installation...');
  const nextPath = path.join(projectDir, 'node_modules', 'next', 'package.json');
  if (fs.existsSync(nextPath)) {
    console.log('✅ Next.js verified\n');
  } else {
    console.error('❌ Next.js not found!');
    process.exit(1);
  }

  // Step 6: Start dev server
  console.log('🚀 Starting development server...\n');
  console.log('='.repeat(60));
  console.log('🌐 Application ready at: http://localhost:3000');
  console.log('📍 Routes:');
  console.log('   • Home: http://localhost:3000');
  console.log('   • Methodology: http://localhost:3000/methodology');
  console.log('   • Analytics: http://localhost:3000/analytics');
  console.log('   • Documentation: http://localhost:3000/documentation');
  console.log('   • About: http://localhost:3000/about');
  console.log('');
  console.log('⏹️  Press Ctrl+C to stop the server');
  console.log('='.repeat(60) + '\n');

  // Start the dev server with inherited stdio (shows all output)
  execSync('npm run dev', { stdio: 'inherit' });

} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
