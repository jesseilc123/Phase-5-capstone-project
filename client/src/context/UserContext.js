import { createContext, useState } from "react";
import pikminIcons from "./images/pikmin"
import characterIcons from "./images/character";
import  mapIcons from "./images/map";
import enemyIcons from "./images/enemy"
import treasureIcons from "./images/treasure";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const cat = [{category: "Pikmin", image: require("../utils/category/pikminCat.png")}, {category: "Characters", image: require("../utils/category/charactersCat.png")}, {category: "Maps", image: require("../utils/category/mapsCat.png")}, {category: "Enemies", image: require("../utils/category/enemiesCat.png")}, {category: "Treasure", image: require("../utils/category/treasureCat.png")}, {category: "Forums", image: require("../utils/category/forumsCat.png")}]

    const social = [{platform: "SIGN IN WITH FACEBOOK", image: require("../utils/icons/facebook_icon.png"), color: "bg-facebook"}, {platform: "SIGN IN WITH GOOGLE", image: require("../utils/icons/google_icon.png"), color: "bg-google"}, {platform: "SIGN IN WITH TWITCH", image: require("../utils/icons/twitch_icon.png") , color: "bg-twitch"}, {platform: "SIGN IN WITH APPLE", image: require("../utils/icons/apple_icon.png"), color: "bg-apple"}]

    const postCategories = ["All", "Spoilers", "Memes", "Info", "General", "Game"]

    const [activeSidebar, setActiveSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const [view, setView] = useState("login");

    const [maps, setMaps] = useState([]);
    const [currentMap, setCurrentMap] = useState(null);
    const [currentImageMap, setCurrentImageMap] = useState(null);

    const [invalid, setInvalid] = useState(false);

    return (
        <UserContext.Provider 
            value={
                { cat, activeSidebar, setActiveSidebar, user, setUser, view, setView, social, pikminIcons, characterIcons, maps, setMaps, mapIcons, enemyIcons, treasureIcons, currentMap, setCurrentMap, currentImageMap, setCurrentImageMap, postCategories, invalid, setInvalid}
            }
        >
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }