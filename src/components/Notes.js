import React, { useContext } from "react";
import { useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
