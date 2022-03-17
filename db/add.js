const fs = require("fs");
const util = require('util');
const { v4: uuidv4 } = require('uuid');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Add {

  readFs() {
    return readFileAsync("db/db.json", "utf8");
  }

  writeFs(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  readAllNotes() {
    return this.readFs().then(notes => [...JSON.parse(notes)])
  }

  addNewNote(note) {
    let newNote = {
      id: uuidv4(),
      title: note.title,
      text: note.text
    }
    return this.readAllNotes()
      .then(notes => [...notes, newNote])
      .then(notes => this.writeFs(notes))
      .then(() => this.readAllNotes())
  }

  deleteNote(id) {
    return this.readAllNotes()
      .then(notes => notes.filter(note => note.id !== id))
      .then(notes => this.writeFs(notes))
      .then(() => this.readAllNotes())
  }

}

module.exports = new Add();
