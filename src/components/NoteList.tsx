import * as React from "react";
import { INote } from "../Layout";
import Note from "./Note";

interface INoteList {
  notes?: Array<INote> | null;
  removeNote: (id: string) => Promise<void>;
  checkNote: (note: INote) => Promise<void>;
}

export const NoteList: React.FC<INoteList> = ({
  notes,
  removeNote,
  checkNote,
}) => {
  return (
    <ul className="flex flex-col gap-2 mt-2">
      {notes &&
        notes.map((note: INote) => (
          <Note
            note={note}
            key={note.id}
            removeNote={removeNote}
            checkNote={checkNote}
          />
        ))}
    </ul>
  );
};
