const fs = require('fs');
const path = require('path');

const currentFile = path.join(__dirname, '../Data(hira).csv');
const archiveFile = path.join(__dirname, '../Data(hira) - archive.csv');
const logDir = path.join(__dirname, '../logs');

function parseCSV(content) {
    const lines = content.replace(/\uFEFF/g, '').split(/\r?\n/).filter(line => line.trim() !== '');
    const map = new Map();
    // Assuming structure: 0,ch_info,ch,jp_info,jp,ruby
    // where index 3 is jp_info (the verse reference)
    for (const line of lines) {
        // Simple manual split parsing: assumes no commas inside quotes in this specific dataset
        const parts = line.split(',');
        if (parts.length >= 6) {
            const ref = parts[3]; // eg. 創1:1
            if (ref && ref !== 'jp_info') {
                map.set(ref, {
                    ch: parts[2],
                    jp: parts[4],
                    ruby: parts[5]
                });
            }
        }
    }
    return map;
}

try {
    if (!fs.existsSync(currentFile) || !fs.existsSync(archiveFile)) {
        throw new Error('Data(hira).csv or Data(hira) - archive.csv is missing in the root directory.');
    }

    const currentText = fs.readFileSync(currentFile, 'utf8');
    const archiveText = fs.readFileSync(archiveFile, 'utf8');

    console.log('Parsing current data...');
    const currentData = parseCSV(currentText);
    console.log('Parsing archive data...');
    const archiveData = parseCSV(archiveText);

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    // Generate formatted date string: YYYYMMDD_HHMMSS
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
                    (now.getMonth() + 1).toString().padStart(2, '0') +
                    now.getDate().toString().padStart(2, '0') + '_' +
                    now.getHours().toString().padStart(2, '0') +
                    now.getMinutes().toString().padStart(2, '0') +
                    now.getSeconds().toString().padStart(2, '0');

    const logFile = path.join(logDir, `${dateStr}_log.txt`);

    const changes = [];

    // Compare
    for (const [ref, curr] of currentData.entries()) {
        const arch = archiveData.get(ref);
        if (!arch) {
            changes.push(`[NEW] ${ref}`);
            changes.push(`  JP: ${curr.jp}`);
        } else {
            let verseChanged = false;
            let diffDetails = [];

            if (curr.jp !== arch.jp) {
                verseChanged = true;
                diffDetails.push(`  JP  - ${arch.jp}`);
                diffDetails.push(`      + ${curr.jp}`);
            }
            if (curr.ruby !== arch.ruby) {
                verseChanged = true;
                diffDetails.push(`  RUBY- ${arch.ruby}`);
                diffDetails.push(`      + ${curr.ruby}`);
            }
            if (curr.ch !== arch.ch) {
                verseChanged = true;
                diffDetails.push(`  CH  - ${arch.ch}`);
                diffDetails.push(`      + ${curr.ch}`);
            }

            if (verseChanged) {
                changes.push(`[MODIFIED] ${ref}`);
                changes.push(...diffDetails);
            }
        }
    }

    for (const ref of archiveData.keys()) {
        if (!currentData.has(ref)) {
            changes.push(`[DELETED] ${ref}`);
        }
    }

    const logContent = `Bible App Local Update Log\nGenerated at: ${new Date().toLocaleString()}\n---------------------------------------------------\n\n` +
                       (changes.length > 0 ? changes.join('\n') : 'No changes detected.');

    fs.writeFileSync(logFile, logContent, 'utf8');
    console.log(`\nUpdate check complete. Found ${changes.filter(c => c.startsWith('[')).length} changed verses.`);
    console.log(`Log written to: ${logFile}`);

} catch (err) {
    console.error('Error generating update log:', err.message);
}
