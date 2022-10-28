import * as React from "react";
import { INote } from "../Layout";
import Note from "./Note";

interface INoteList {
  notes: Array<INote> | null;
}

export const NoteList: React.FC<INoteList> = ({ notes }) => {
  return (
    <ul className="flex flex-col gap-2 mt-2">
      {notes &&
        notes.map((note: INote) => (
          <Note note={note} key={note.id} />
        ))}
    </ul>
  );
};
