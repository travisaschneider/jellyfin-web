const fs = require('fs');
const path = require('path');

// Cloudflare uses /opt/buildhome/repo as the root
const midiRoot = path.join(__dirname, '../src/assets/music/midi');
const outputFile = path.join(__dirname, '../src/assets/music/midi-map.json');

function getMidis(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return fileList;
    }
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getMidis(filePath, fileList);
        } else if (file.toLowerCase().endsWith('.mid') || file.toLowerCase().endsWith('.midi')) {
            // Use forward slashes for the web URL
            const relativePath = './assets/music/midi/' + path.relative(midiRoot, filePath).replace(/\\/g, '/');
            fileList.push(relativePath);
        }
    });
    return fileList;
}

console.log('Indexing MIDI files...');
const allMidis = getMidis(midiRoot);
fs.writeFileSync(outputFile, JSON.stringify(allMidis));
console.log(`Success! Indexed ${allMidis.length} MIDI files to ${outputFile}`);
