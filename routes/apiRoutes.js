const router = require("express").Router();
const fs = require("fs");
let database = require("../db/db.json");

// localhost;3001/api
router.get("/notes", (req, res) => {
  res.json(database);
});

// post route gets newnote data pushs it to database and updates
router.post("/notes", (req, res) => {
  //model
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.random(),
  };
  database.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(database));

  res.json(database);
});

router.delete("/notes/:id", (req, res) => {
  // Find the note in the database using the id from the request parameters
  let notesToKeep =[]

  for(let i = 0; i < database.length; i++){
    if(database[i].id != req.params.id){
      notesToKeep.push(database[i])
    }
  }

  // If the note was found, remove it from the database
  // if (noteIndex !== -1) {
  //   database.splice(noteIndex, 1);
  database = notesToKeep
    // Save the updated database back to the file
    fs.writeFileSync("./db/db.json", JSON.stringify(database));

    // Send a success message back to the client
    res.json({ message: "Note deleted successfully" });
  // } else {
  //   // If the note wasn't found, send a 404 status code and an error message
  //   res.status(404).json({ error: "Note not found" });
  // }
});

module.exports = router;
// put request to update note