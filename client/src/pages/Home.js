import React, { useContext } from "react";
import GuideCard from "../components/GuideCard";
import { UserContext } from "../context/UserContext";
import Announcements from "../components/Announcements";

function Home() {
    const { cat } = useContext(UserContext)

    return (
        <div className="flex h-full w-full bg-hero-pattern bg-no-repeat bg-cover bg-grey items-center justify-center">
            <div className="flex flex-col mt-24 lg:ml-12 mb-20 max-w-7xl">
                <div className="flex flex-wrap text-center justify-center bg-light-blue">
                    <p className="flow-text break-words text-white lg:text-8xl text-4xl">
                        Welcome to the Pikmin 4 Wiki! 
                    </p>
                </div>
                <Announcements />
                <div className="flex flex-row flex-wrap h-full w-full items-center justify-evenly">
                    {cat.map((c) => (
                        <GuideCard 
                            key={c.category}
                            cat={c}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Home;