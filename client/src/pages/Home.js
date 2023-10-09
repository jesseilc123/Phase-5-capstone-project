import React, { useContext, useEffect } from "react";
import GuideCard from "../components/GuideCard";
import { UserContext } from "../context/UserContext";
import Announcements from "../components/Announcements";

function Home() {
    const { cat, setCurrentMap, setCurrentImageMap} = useContext(UserContext)

    useEffect(() => {
        setCurrentMap(null)
        setCurrentImageMap(null)
    }, []);

    return (
        <div className="flex h-full w-full bg-hero-pattern bg-no-repeat bg-grey items-center justify-center">
            <div className="flex flex-col mt-24 xl:ml-12 mb-[70px] max-w-7xl">
                <div className="flex text-center justify-center border-black border-t-2 border-x-2 xl:border-b-2 bg-light-blue w-auto h-auto xl:mt-3 xl:rounded-md">
                    <p className="flex break-words text-white md:text-8xl text-4xl flex-wrap">
                        Welcome to the Pikmin 4 Wiki! 
                    </p>
                </div>
                <Announcements />
                <div className="flex flex-row flex-wrap h-full w-full justify-evenly">
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