const router = require('express').Router();
const Add = require('../db/add')

router.get('/notes', (req, res) => {
  Add
    .readAllNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
})

router.post('/notes', (req, res) => {
  Add
    .addNewNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
})

router.delete('/notes/:id', (req, res) => {
  Add
    .deleteNote(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
})


module.exports = router;