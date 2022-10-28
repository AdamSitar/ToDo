import React from "react";
import UserProvider from "./context/user";
import Layout from "./Layout";

function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

export default App;
