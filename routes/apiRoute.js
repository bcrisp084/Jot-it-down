const notes = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    const { v4: uuidv4 } = require("uuid");
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    let noteID = req.params.id;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === noteID) {
        notes.splice(i, 1);
        break;
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      res.send("Deleted Note");
    });
  });
};
