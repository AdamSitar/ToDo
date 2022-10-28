import { format, parseISO } from "date-fns";
import * as React from "react";
import { INote } from "../Layout";
import ExpandBox from "./animation/ExpandBox";
import IconButton from "./animation/IconButton";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as UncheckedIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckedIcon } from "@heroicons/react/24/solid";

interface INoteComponent {
  note: INote;
  removeNote: (id: string) => Promise<void>;
  checkNote: (note: INote) => Promise<void>;
}

const Note: React.FC<INoteComponent> = ({
  note,
  removeNote,
  checkNote,
}) => {
  return (
    <li>
      <ExpandBox title={note.title}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-gray-400">{note.description}</p>
            <p className="text-rose-500">
              {note.deadline &&
                format(parseISO(note.deadline), "dd/MM/yyyy, mm:HH")}
            </p>
          </div>

          <div className="flex flex-row justify-center items-center">
            <IconButton
              icon={
                note.checked ? <CheckedIcon /> : <UncheckedIcon />
              }
              onClick={() => checkNote(note)}
            />
            <IconButton
              icon={<XCircleIcon />}
              onClick={() => removeNote(note.id)}
            />
          </div>
        </div>
      </ExpandBox>
    </li>
  );
};

export default Note;
