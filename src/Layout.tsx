import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import Login from "./components/Login";
import { NoteList } from "./components/NoteList";
import { useUser } from "./context/user";
import { supabase } from "./utils/supabase";
import ListForm from "./components/ListForm";

export interface INote {
  id: string;
  title: string;
  description: string;
  deadline: string;
  checked: boolean;
}

export interface IList {
  id: string;
  title: string;
}

const Layout = () => {
  const { session, logout } = useUser();
  const user = session?.user;
  const [notes, setNotes] = useState<Array<INote> | null>(null);
  const [lists, setLists] = useState<Array<IList> | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data: notes } = await supabase.from("note").select();
      const { data: lists } = await supabase.from("list").select();
      setNotes(notes);
      setLists(lists);
      return notes;
    };
    getData();
  }, []);
  return (
    <div className="p-8 sm:p-16">
      {!user ? (
        <Login />
      ) : (
        <>
          {/* <List /> */}
          <button
            className="border rounded w-full"
            onClick={() => logout()}
          >
            logout
          </button>
          {/* <NoteForm /> */}
          <ListForm />
          <ul className="mt-2">
            {lists?.map((list) => (
              <li key={list.id} className="rounded border p-2">
                <h1 className="text-xl">{list.title}</h1>
                <NoteForm list_id={list.id} />
                <NoteList notes={notes} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Layout;
