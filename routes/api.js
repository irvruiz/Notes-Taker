const router = require('express').Router();
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
const db = require('../Develop/db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers');

router.get('/api/notes', (req, res) => {
  readFromFile('.Develop/db/db.json').then((data) =>
    res.json(JSON.parse(data))
  )
  .catch((err) => console.log(err))
});

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

        const newNote = {
            title,
            text,
            id: uniqid(),
        };
       readAndAppend(newNote, '.Develop/db/db.json');
       res.json(newNote);
   
  })

router.delete("/api/notes/:id",  (req, res) => {
  const { id } = req.params;
  readFromFile('.Develop/db/db.json').then((notes) =>{
      notes = JSON.parse(notes).filter(note => note.id != id);
      console.log("filtered notes:\n", notes);
      const finalNote = writeToFile('.Develop/db/db.json', notes); 
      console.log("final note:\n", JSON.stringify(finalNote));
      res.status(200).json(finalNote);
  }
)
.catch((err) => console.log(err));
});

module.exports = router;