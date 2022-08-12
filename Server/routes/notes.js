const express = require("express");
const notesRouter = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/notesModel");
//Route 1: get all the notes using Get:"/notes/fetchallnotes" login required
notesRouter.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2:add new notes using Get:"/note/addnote" login required
notesRouter.post(
  "/addnote   ",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Enter the valid description of atleast 5 character"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await notes.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//route 3: Update an existing Note using Put:"/notes/updatenote/:id"
notesRouter.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //create newNote
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Provide apropriate information",
    });
  }
});

//route 4: delete an existing Note using delete:"/notes/deletenote/:id"
notesRouter.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Find the note to be delete
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ note: note, message: "Deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Provide apropriate information",
    });
  }
});
module.exports = notesRouter;
