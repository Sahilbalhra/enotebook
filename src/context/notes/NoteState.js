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
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));

    console.log("Adding a new note");
    // let note = {
    //   _id: "62f5f13e763d009bb6c622",
    //   user: "62f5d6f1bca373a9ad09c5d0",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2022-08-12T06:20:46.498Z",
    //   __v: 0,
    // };
    // setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // const json = await response.json();
    // console.log(json);

    console.log("Deleting the node with id", id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
