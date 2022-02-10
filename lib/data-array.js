const fs = require('fs');
const path = require('path');
var notes;
// re-writes json file with all objects in array
var writeFile = () => {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 4))
}

// added current data to an array
var addData = (note) => {
    notes = [];
    const readData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
    if(readData.length > 0) {
        var parsedData = JSON.parse(readData);
        parsedData.forEach(object => {
            notes.push(object)
        }) 
    } 
    notes.push(note);
    writeFile();
}

module.exports = addData;