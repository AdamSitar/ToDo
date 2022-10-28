import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { useUser } from "./context/user";
import { supabase } from "./utils/supabase";
import ListForm from "./components/ListForm";
import List from "./components/List";
import FilterButtons from "./components/FilterButtons";

export interface INote {
  id: string;
  title: string;
  description: string;
  deadline: string;
  checked: boolean;
  list_id: string;
}

export interface IList {
  id: string;
  title: string;
}

const Layout = () => {
  const { session, logout } = useUser();
  const user = session?.user;
  const [lists, setLists] = useState<Array<IList> | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data: lists } = await supabase.from("list").select();
      setLists(lists);
    };
    getData();
  }, []);
  return (
    <div className="p-8 sm:p-16 flex flex-col items-center">
      {!user ? (
        <Login />
      ) : (
        <>
          <button
            className="border rounded w-full"
            onClick={() => logout()}
          >
            logout
          </button>
          <ListForm />
          <ul className="mt-2 w-full">
            {lists?.map((list) => (
              <List key={list.id} list={list} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Layout;
