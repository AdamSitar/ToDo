import React from "react";
import UserProvider from "./context/user";
import Layout from "./Layout";

function App() {
  return (
    <UserProvider>
      <div className="w-screen h-screen flex flex-col items-center p-8">
        <div className="sm:w-[500px] md:w-[700px]">
          <Layout />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
