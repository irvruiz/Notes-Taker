const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const removeData = require('../../lib/remove-data');
const createID = require('../../lib/create-id');
const addData = require('../../lib/data-array');



// request to view existing note
router.get('/', (req,res) => {
    // responds with fetched data
    const readData = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf-8',)
    res.json(JSON.parse(readData));
})



//post request to create new note when clicking save button
router.post('/', (req,res) => {
    const {title, text} = req.body;

    const note = {
        id: `${createID()}`,
        title,
        text,
    };
    addData(note)
    res.json(note);
})



// to delete note when button is clicked
router.delete('/:id', (req,res) => {
    // uses the removeData fuction and passes through id
    removeData(`${req.params.id}`)
    const readData = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf-8',)
    res.json(JSON.parse(readData));
})



module.exports = router;