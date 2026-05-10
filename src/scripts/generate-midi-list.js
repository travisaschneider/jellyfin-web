const fs = require('fs');
const path = require('path');

// Crawl /src/assets/music/midi/ recursively
const midiDir = path.join(__dirname, '../src/assets/music/midi');
const outputFile = path.join(__dirname, '../src/assets/music/midi-map.json');

const getFiles = (dir) => {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(getFiles(fullPath));
        } else if (file.endsWith('.mid')) {
            // Store path relative to your web root
            results.push(fullPath.split('src')[1].replace(/\\/g, '/'));
        }
    });
    return results;
};

fs.writeFileSync(outputFile, JSON.stringify(getFiles(midiDir)));
