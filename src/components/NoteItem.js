import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {note,updateNote}=props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5>{note.title}</h5>
            <div className="icon">
              <i
                className="far fa-trash-alt mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i className="fa-solid fa-pen-to-square mx-2"
              onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>

          <p>{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
