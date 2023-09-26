import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import Pikmin from "../pages/Pikmin";
import Characters from "../pages/Characters";
import Maps from "../pages/Maps";
import Treasure from "../pages/Treasure";
import Forums from "../pages/Forums";

function App() {
  const cat = [{category: "Pikmin", image: require("../utils/category/pikminCat.png")}, {category: "Characters", image: require("../utils/category/charactersCat.png")}, {category: "Maps", image: require("../utils/category/mapsCat.png")}, {category: "Enemies", image: require("../utils/category/enemiesCat.png")}, {category: "Treasure", image: require("../utils/category/treasureCat.png")}, {category: "Forums", image: require("../utils/category/forumsCat.png")}]

  return (
    <div>
      <Navbar />
      <Sidebar cat={cat}/>
      <main>
        <Routes>
          <Route path="/forums" element={<Forums />} />
          <Route path="/treasure" element={<Treasure />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/pikmin" element={<Pikmin />} />
          <Route path="/" element={<Home cat={cat}/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
