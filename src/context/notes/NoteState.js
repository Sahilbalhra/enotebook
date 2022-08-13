// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62f5f13d3d32009b636ab6c620",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:45.585Z",
      __v: 0,
    },
    {
      _id: "62f5f13213e3d009b636ab6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    },
    {
      _id: "62f5f1233e3d009b636ab6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    },
    {
      _id: "62f5f13e35334d009b636ab6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    },
    {
      _id: "62f5f13e343d009b636ab6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    },
    {
      _id: "62f5f13e3d009b636ab6c622",
      user: "62f5d6f1bca373a9ad09c5d0",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2022-08-12T06:20:46.498Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
