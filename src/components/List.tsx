import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import { NoteList } from "./NoteList";
import { IList, INote } from "../Layout";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";
import FilterButtons, { TFilterOption } from "./FilterButtons";
import IconButton from "./animation/IconButton";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

interface IOwnProps {
  list: IList;
  removeList: (id: string) => Promise<void>;
}

const List: React.FC<IOwnProps> = ({ list, removeList }) => {
  const { session } = useUser();
  const [notes, setNotes] = useState<Array<INote> | null>(null);
  const [filterState, setFilterState] = useState<
    Array<TFilterOption | undefined>
  >(["checked", "unchecked"]);

  useEffect(() => {
    const getData = async () => {
      const { data: notes } = await supabase.from("note").select();
      setNotes(notes);
      return notes;
    };
    getData();
  }, []);

  const sortedData = notes?.filter((note) =>
    filterState.includes(note.checked ? "checked" : "unchecked")
  );

  const createNote = async (data: any) => {
    const new_note = {
      title: data.title,
      description: data.description,
      created_by: session?.user.email,
      checked: false,
      deadline: data.deadline,
      list_id: list.id,
    };
    const { data: res_data, error } = await supabase
      .from("note")
      .insert(new_note)
      .select();
    !error && notes && setNotes([...notes, res_data[0]]);
  };

  const removeNote = async (id: string) => {
    const { error } = await supabase
      .from("note")
      .delete()
      .eq("id", id);
    !error &&
      notes &&
      setNotes([...notes.filter((note) => note.id !== id)]);
  };

  const checkNote = async (note: INote) => {
    const { error } = await supabase
      .from("note")
      .update({ checked: !note.checked })
      .eq("id", note.id);
    !error &&
      notes &&
      setNotes(
        notes.map((x) =>
          x.id === note.id ? { ...x, checked: !note.checked } : x
        )
      );
  };
  return (
    <li key={list.id} className="rounded border p-2 w-full">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-xl mb-1">{list.title}</h1>
        <IconButton
          icon={<XCircleIcon />}
          onClick={() => removeList(list.id)}
        />
      </div>

      <FilterButtons
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <NoteForm createNote={createNote} />
      <NoteList
        notes={sortedData}
        removeNote={removeNote}
        checkNote={checkNote}
      />
    </li>
  );
};

export default List;
