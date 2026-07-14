const fs = require('fs');
const path = require('path');

// Function to process a single file
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Replace all https://vselasticthread.com with empty string
    let modified = content.replace(/https:\/\/vselasticthread\.com/g, '');
    
    // Step 2: Remove the eptagmanage script block
    // Regex to match <script defer>...</script> that contains eptagmanage
    const eptagmanageRegex = /<script defer>\s*\$\(function\(\) \{[\s\S]*?eptagmanage[\s\S]*?\}\s*\);[\s\S]*?<\/script>/g;
    modified = modified.replace(eptagmanageRegex, '');
    
    // Write back to file
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`Successfully processed ${path.basename(filePath)}!`);
}

// List of files to process
const filesToProcess = [
    path.join(__dirname, 'certificates.html'),
    path.join(__dirname, 'contact.html')
];

// Add all files in products/ directory
const productsDir = path.join(__dirname, 'products');
if (fs.existsSync(productsDir)) {
    const productFiles = fs.readdirSync(productsDir).filter(file => file.endsWith('.html'));
    productFiles.forEach(file => {
        filesToProcess.push(path.join(productsDir, file));
    });
}

// Process all files
console.log('Processing files...');
filesToProcess.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        processFile(filePath);
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});

console.log('All files processed successfully!');
