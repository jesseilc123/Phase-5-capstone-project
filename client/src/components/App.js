import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";

function App() {
  const cat = [{category: "Pikmin", image: require("../utils/category/pikminCat.png")}, {category: "Characters", image: require("../utils/category/charactersCat.png")}, {category: "Maps", image: require("../utils/category/mapsCat.png")}, {category: "Enemies", image: require("../utils/category/enemiesCat.png")}, {category: "Treasure", image: require("../utils/category/treasureCat.png")}, {category: "Forums", image: require("../utils/category/forumsCat.png")}]

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar cat={cat}/>
        <Home cat={cat}/>
      </div>
    </div>
  );
}

export default App;
