import { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const cat = [{category: "Pikmin", image: require("../utils/category/pikminCat.png")}, {category: "Characters", image: require("../utils/category/charactersCat.png")}, {category: "Maps", image: require("../utils/category/mapsCat.png")}, {category: "Enemies", image: require("../utils/category/enemiesCat.png")}, {category: "Treasure", image: require("../utils/category/treasureCat.png")}, {category: "Forums", image: require("../utils/category/forumsCat.png")}]

    const social = [{platform: "SIGN IN WITH FACEBOOK", image: require("../utils/icons/facebook_icon.png"), color: "bg-facebook"}, {platform: "SIGN IN WITH GOOGLE", image: require("../utils/icons/google_icon.png"), color: "bg-google"}, {platform: "SIGN IN WITH TWITCH", image: require("../utils/icons/twitch_icon.png") , color: "bg-twitch"}, {platform: "SIGN IN WITH APPLE", image: require("../utils/icons/apple_icon.png"), color: "bg-apple"}]

    const pikminIcons = [
        {name: "Red Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/red_icon.png")}, 
        {name: "Yellow Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/yellow_icon.png")}, 
        {name: "Blue Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/blue_icon.png")},
        {name: "White Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/white_icon.png")}, 
        {name: "Purple Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/purple_icon.png")},
        {name: "Rock Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/rock_icon.png")}, 
        {name: "Winged Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/wing_icon.png")}, 
        {name: "Ice Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/ice_icon.png")}, 
        {name: "Glow Pikmin", image: require("/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_images/glow_icon.png")}
    ]

    const [activeSidebar, setActiveSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const [view, setView] = useState("login");

    return (
        <UserContext.Provider value={{ cat, activeSidebar, setActiveSidebar, user, setUser, view, setView, social, pikminIcons}}>{ children }</UserContext.Provider>
    );
};

export { UserContext, UserProvider }