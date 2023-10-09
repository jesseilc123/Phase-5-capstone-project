import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import IconCard from "../components/IconCard";

function Maps() {
    const { maps, setMaps, currentMap, setCurrentMap, currentImageMap, setCurrentImageMap, mapIcons } = useContext(UserContext)

    
    useEffect(() => {
        window.scroll(0, 0)
        fetch("http://localhost:5555/maps") 
            .then((r) => r.json())
            .then(data => {
                setMaps(data)
            })
    }, []);

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center ">
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center ">
                <div className="flex flex-wrap items-center justify-center bg-n-green lg:w-[1000px] min-h-[300px] lg:h-[700px] h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg">
                    <div>
                        {currentMap === null ? (
                            <>
                                <div className="flex flex-col item-center lg:pt-0 p-12 mt-8">
                                    <p className="flex item-center justify-center font-bold text-2xl">No Map Selected!</p>
                                    <div className="flex flex-row flex-wrap item-center justify-center">
                                        <p className="flex font-bold text-2xl">Select a Map&nbsp;</p>
                                        <p className="flex font-bold text-2xl">for more information</p>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <> 
                                <div className="flex flex-row items-center justify-evenly flex-wrap mt-12 ">
                                    <div className="flex flex-col flex-wrap items-center justify-center">
                                        <img src={currentImageMap} alt={currentMap.name}className="md:h-[300px] md:w-[600px] h-full w-full md:px-0 px-2 rounded-xl"/>
                                        <p className="text-4xl font-bold mt-4">{currentMap.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col h-fit mt-8 lg:mx-12 mx-4 border-[3px] rounded-lg">
                                    <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Description</h2>
                                    <p className="text-lg font-medium tracking-wide p-2">{currentMap.description}</p>
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
                <IconCard 
                    icon={mapIcons} 
                    states={maps} 
                    setCurrentState={setCurrentMap} 
                    setCurrentImage={setCurrentImageMap}
                />
            </div>
        </div>
    );
};

export default Maps;