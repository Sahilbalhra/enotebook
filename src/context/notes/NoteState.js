// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";


  const [notes, setNotes] = useState([]);
  //Get all note
  const getNotes = async () => {
    //todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNWQ2ZjFiY2EzNzNhOWFkMDljNWQwIn0sImlhdCI6MTY2MDI4MDUxM30.OQt5x8eijvxRNkpxB-ofXD3vBQemGI7F093qT28uBqc",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNWQ2ZjFiY2EzNzNhOWFkMDljNWQwIn0sImlhdCI6MTY2MDI4MDUxM30.OQt5x8eijvxRNkpxB-ofXD3vBQemGI7F093qT28uBqc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json= response.json();

    console.log("Adding a new note");
    let note = {
      _id: "62f5f13e3d009bb6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: title,
      description: description,
      tag: tag,
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = (id) => {
    console.log("Deleting the node with id", id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNWQ2ZjFiY2EzNzNhOWFkMDljNWQwIn0sImlhdCI6MTY2MDI4MDUxM30.OQt5x8eijvxRNkpxB-ofXD3vBQemGI7F093qT28uBqc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json= response.json();

    //logic
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
