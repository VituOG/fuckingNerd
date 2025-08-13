#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up NeuroCore Optimizer...\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js 16+ is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version:', nodeVersion);

// Check npm version
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log('✅ npm version:', npmVersion);
} catch (error) {
  console.error('❌ npm is not installed');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Create necessary directories
const dirs = [
  'assets',
  'logs',
  'temp',
  'build',
  'dist'
];

console.log('\n📁 Creating directories...');
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Check for required files
const requiredFiles = [
  'package.json',
  'electron/main.js',
  'electron/preload.js',
  'src/App.tsx',
  'src/index.tsx'
];

console.log('\n🔍 Checking required files...');
let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Some required files are missing. Please check the repository structure.');
  process.exit(1);
}

// Setup development environment
console.log('\n⚙️ Setting up development environment...');

// Create .env file if it doesn't exist
if (!fs.existsSync('.env')) {
  const envContent = `# Development Environment Variables
NODE_ENV=development
ELECTRON_IS_DEV=true
`;
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file');
}

// Setup Git hooks if Git is available
try {
  execSync('git --version', { stdio: 'ignore' });
  console.log('✅ Git is available');
  
  // Install Husky if not already installed
  if (!fs.existsSync('.husky')) {
    try {
      execSync('npx husky install', { stdio: 'inherit' });
      console.log('✅ Husky installed');
    } catch (error) {
      console.log('⚠️ Husky installation skipped');
    }
  }
} catch (error) {
  console.log('⚠️ Git not available, skipping Git hooks setup');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\nNext steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Run "npm run build" to build for production');
console.log('3. Run "npm run dist" to create the installer');
console.log('\n📚 Check the README.md and docs/DEVELOPMENT.md for more information'); 