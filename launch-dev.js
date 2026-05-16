const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = 'c:\\Users\\САМАКЕ ИБРАНИМ\\Desktop\\projet_fin_anne';
const nodeModulesPath = path.join(projectDir, 'node_modules');

console.log('Numerical Integration Scientific Platform - Dev Server Launcher');
console.log('='.repeat(60));
console.log(`Project directory: ${projectDir}`);
console.log('');

// Check if node_modules exists
if (!fs.existsSync(nodeModulesPath)) {
    console.log('node_modules not found. Running: npm install');
    console.log('This may take a few minutes...\n');
    
    try {
        process.chdir(projectDir);
        execSync('npm install', { stdio: 'inherit' });
        console.log('\n✓ npm install completed successfully\n');
    } catch (error) {
        console.error('Error during npm install:', error.message);
        process.exit(1);
    }
} else {
    console.log('✓ node_modules already exists\n');
    process.chdir(projectDir);
}

console.log('Starting Next.js development server...');
console.log('Server will be available at: http://localhost:3000');
console.log('Press Ctrl+C to stop the server\n');
console.log('='.repeat(60));
console.log('');

try {
    execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
    if (error.status !== 0 && error.signal !== 'SIGINT') {
        console.error('Error starting dev server:', error.message);
        process.exit(1);
    }
}
