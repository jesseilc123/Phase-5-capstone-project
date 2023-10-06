import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import IconCard from "../components/IconCard";

function Treasure() {
    const { maps, setMaps, treasureIcons, setCurrentMap, mapIcons, setCurrentImageMap } = useContext(UserContext)
    const [currentTreasure, setCurrentTreasure] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)

    const [treasures, setTreasures] = useState([])
    useEffect(() => {
        window.scroll(0, 0)
        fetch("http://localhost:5555/treasures") 
            .then((r) => r.json())
            .then(data => {
                setTreasures(data)
            })

        fetch("http://localhost:5555/maps") 
            .then((r) => r.json())
            .then(data => {
                setMaps(data)
            })
    }, [setMaps]);

    function linkToMaps() {
        const m = maps.filter(map => map.id === currentTreasure.location)
        const i = mapIcons.filter(map => map.name === m[0].name)
        setCurrentMap(m[0])
        setCurrentImageMap(i[0].image)
    };

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center ">
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center">
                <div className="flex flex-wrap items-center justify-center bg-n-green lg:w-[1000px] h-[300px] lg:h-[700px] w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg">
                    <div>
                        {currentTreasure === null ? (
                            <>
                                <div className="flex flex-col item-center lg:pt-0 p-12 mt-8">
                                    <p className="flex item-center justify-center font-bold text-2xl">No Character Selected!</p>
                                    <div className="flex flex-row flex-wrap item-center justify-center">
                                        <p className="flex font-bold text-2xl">Select a Character</p>
                                        <p className="flex font-bold text-2xl">for more information</p>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <> 
                                <div className="flex flex-row items-center justify-evenly flex-wrap mt-12 ">
                                    <div className="flex flex-col flex-wrap items-center justify-center">
                                        <img src={currentImage} alt={currentTreasure.name}className="h-72 w-72 rounded-xl"/>
                                        <p className="text-4xl font-bold mt-4">{currentTreasure.name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 flex-wrap justify-center mx-4 mt-4 pb-3 border-[3px] rounded-md h-full md:w-1/3 w-full">
                                        <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Stats</h2>
                                        <p className="text-lg font-semibold ml-1">
                                            <span className="bg-beige rounded-xl pb-1 px-2">Name:</span> 
                                            <span> {currentTreasure.name}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Series:</span> 
                                            <span> {currentTreasure.series}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Sparklium:</span>
                                            <span> {currentTreasure.sparklium}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">location:</span>
                                            <Link to="/maps" onClick={() => linkToMaps()}> {maps.filter(map => map.id === currentTreasure.location).map(name => name.name)}</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col  h-fit mt-8 lg:mx-12 mx-4 border-[3px] rounded-lg">
                                    <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Description</h2>
                                    <p className="text-lg font-medium tracking-wide p-2">{currentTreasure.description}</p>
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
                <IconCard 
                    icon={treasureIcons} 
                    states={treasures} 
                    setCurrentState={setCurrentTreasure} 
                    setCurrentImage={setCurrentImage}
                />
            </div>
        </div>
    );
};

export default Treasure;