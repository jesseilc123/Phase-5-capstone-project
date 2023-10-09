import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";

import Pikmin from "../pages/Pikmin";
import Characters from "../pages/Characters";
import Maps from "../pages/Maps";
import Treasure from "../pages/Treasure";
import Forums from "../pages/Forums";
import Login from "../pages/Login";
import Enemies from "../pages/Enemies"

function App() {
  const { user, setUser } = useContext(UserContext)
  const [ test, setTest] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5555/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then(user => setUser(user));
        } else {
          r.json().then(err => console.log(err));
        }
    });
    }, []);

  return (
    <div>
      <UserProvider>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/forums" element={<Forums />} />
          <Route path="/treasure" element={<Treasure />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/enemies" element={<Enemies />} />
          <Route path="/pikmin" element={<Pikmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
