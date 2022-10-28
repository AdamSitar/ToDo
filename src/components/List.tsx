import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

// const Note = () => {
//   return (
//     <motion.li
//       initial={{ opacity: 0, height: 0 }}
//       animate={{ opacity: 1, height: "auto" }}
//       exit={{ opacity: 0 }}
//       className="border-b flex justify-between py-2"
//       key={item}
//       transition={{ layout: { duration: 2 } }}
//       layout
//     >
//       <span>Item {item}</span>
//       <button
//         className="border rounded w-8 h-8"
//         onClick={() => removeItem(item)}
//       >
//         &times;
//       </button>
//     </motion.li>
//   );
// };

interface INote {
  id: string;
}

function List() {
  const [notes, setNotes] = useState<Array<INote> | []>([]);

  function addItem() {
    // if (items.map((item) => ) {
    //   alert("Cannot post same note twice");
    //   return;
    // }
    setNotes((notes) => [
      ...notes,
      {
        id: uuidv4(),
      },
    ]);
  }

  function removeItem(id: string) {
    setNotes((notes) =>
      // notes.map((note) => note.id).filter((i) => i !== id)
      [...notes.filter((note) => note.id !== id)]
    );
  }

  return (
    <div className="p-20">
      <div className="flex justify-between">
        <button
          className="border rounded px-2 py-1"
          onClick={() => addItem()}
        >
          Add
        </button>
      </div>
      <ul className="mt-8 border overflow-hidden rounded p-8">
        <AnimatePresence initial={false}>
          {notes.map((note: INote) => (
            <motion.li
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-b flex items-center justify-between py-2"
            >
              <span>Id: {note.id}</span>
              <button
                className="border rounded w-8 h-8"
                onClick={() => removeItem(note.id)}
              >
                &times;
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default List;
