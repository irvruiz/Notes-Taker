const {
  readAndAppend,
  writeToFile,
  readFromFile,
} = require("../helpers/fsUtils");
const router = require("express").Router();
const db = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

router.get("/notes", (req, res) => {
  const dbRoute = path.join(__dirname, "../db/db.json");
  console.log(dbRoute);

  readFromFile(dbRoute)
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/notes", (req, res) => {
  const dbRoute = path.join(__dirname, "../db/db.json");

  const newNote = req.body;
  newNote.id = uuidv4();

  readFromFile(JSON.stringify(dbRoute));
  readAndAppend(newNote, dbRoute);
  res.json(newNote);
});
router.delete("/notes/:id", (req, res) => {
  const noteID = req.params.id;
  const dbRoute = path.join(__dirname, "../db/db.json");
  readFromFile(dbRoute)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteID);
      writeToFile(dbRoute, result);
      res.json(`Item ${noteID} has been deleted`);
    });
});

module.exports = router;
