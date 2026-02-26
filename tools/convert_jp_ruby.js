const fs = require('fs');
const path = require('path');

const targetFiles = [
    '../Data(hira).csv',
    '../Data(hira) - archive.csv'
];

function convertRubyTags(text) {
    // Current format: <ruby>ベース文字<rt>ルビ</rt></ruby>
    // Note: Some might be nested or have extra attributes, but data is simple enough
    // Regex matches the standard tags our dataset uses:
    return text.replace(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g, '|$1($2)');
}

for (const p of targetFiles) {
    try {
        const fullPath = path.join(__dirname, p);
        if (!fs.existsSync(fullPath)) {
            console.log(`File not found: ${fullPath} - skipping...`);
            continue;
        }

        console.log(`Reading ${fullPath}...`);
        const content = fs.readFileSync(fullPath, 'utf8');

        console.log(`Converting ruby tags...`);
        const converted = convertRubyTags(content);

        fs.writeFileSync(fullPath, converted, 'utf8');
        console.log(`Success: Converted format saved to ${fullPath}`);
    } catch (err) {
        console.error(`Error processing ${p}:`, err);
    }
}
