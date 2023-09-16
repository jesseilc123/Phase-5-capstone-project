import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
