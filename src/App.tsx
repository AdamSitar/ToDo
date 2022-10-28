import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import List from "./components/List";
import Login from "./components/Login";
import { NoteList } from "./components/NoteList";
import UserProvider, { useUser } from "./context/user";
import { supabase } from "./utils/supabase";
import ListForm from "./components/ListForm";
import Layout from "./Layout";

function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

export default App;
