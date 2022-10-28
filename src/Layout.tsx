import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { useUser } from "./context/user";
import { supabase } from "./utils/supabase";
import ListForm from "./components/ListForm";
import List from "./components/List";
import UserSection from "./components/UserSection";
import { ListSchemaType } from "./utils/schemas";

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

  const removeList = async (id: string) => {
    const { error: noteError } = await supabase
      .from("note")
      .delete()
      .eq("list_id", id);
    const { error: listError } = await supabase
      .from("list")
      .delete()
      .eq("id", id);
    !listError &&
      lists &&
      setLists([...lists.filter((list) => list.id !== id)]);
  };

  const createList = async (data: ListSchemaType) => {
    const { data: res_data, error } = await supabase
      .from("list")
      .insert({
        title: data.title,
        created_by: session?.user.email,
      })
      .select();
    alert(error);
    !error && lists && setLists([...lists, res_data[0]]);
  };

  return (
    <div className="p-8 sm:p-16 flex flex-col items-center">
      {!user ? (
        <Login />
      ) : (
        <>
          <UserSection logout={logout} />

          <ListForm createList={createList} />
          <ul className="mt-2 w-full">
            {lists?.map((list) => (
              <List
                key={list.id}
                list={list}
                removeList={removeList}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Layout;
