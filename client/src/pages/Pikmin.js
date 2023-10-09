import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";
import IconCard from "../components/IconCard";

function Pikmin() {
    const { pikminIcons } = useContext(UserContext);
    const [currentPikmin, setCurrentPikmin] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)

    const [pikmins, setPikmins] = useState([])
    useEffect(() => {
        window.scroll(0, 0)
        fetch("http://localhost:5555/pikmins") 
            .then((r) => r.json())
            .then(data => {
                setPikmins(data)
            })
    }, []);



    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 items-center justify-center ">
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center">
                <div className="flex flex-wrap items-center justify-center bg-n-green lg:w-[1000px] min-h-[300px] lg:min-h-[700px] h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg">
                    <div>
                        {currentPikmin === null ? (
                            <>
                                <div className="flex flex-col item-center lg:pt-0 p-12 mt-8">
                                    <p className="flex item-center justify-center font-bold text-2xl">No Pikmin Selected!</p>
                                    <div className="flex flex-row flex-wrap item-center justify-center">
                                        <p className="flex font-bold text-2xl">Select a Pikmin</p>
                                        <p className="flex font-bold text-2xl">for more information</p>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <> 
                                <div className="flex flex-row items-center justify-evenly flex-wrap mt-12 ">
                                    <div className="flex flex-col flex-wrap items-center justify-center">
                                        <img src={currentImage} alt={currentPikmin.name}className="h-72 w-72 rounded-xl"/>
                                        <p className="text-4xl font-bold mt-4">{currentPikmin.name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 flex-wrap justify-center mx-4 mt-4 pb-3 border-[3px] rounded-md h-full md:w-1/3 w-full">
                                        <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Stats</h2>
                                        <p className="text-lg font-semibold ml-1">
                                            <span className="bg-beige rounded-xl pb-1 px-2">Resistance:</span> 
                                            <span> {currentPikmin.resistance}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Attack:</span> 
                                            <span> {currentPikmin.attack}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Speed:</span>
                                            <span> {currentPikmin.speed}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Throw:</span>
                                            <span> {currentPikmin.throw}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Carry:</span>
                                            <span> {currentPikmin.carry}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col h-fit mt-8 lg:mx-12 mx-4 mb-6 border-[3px] rounded-lg">
                                    <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Description</h2>
                                    <p className="text-lg font-medium tracking-wide p-2">{currentPikmin.description}</p>
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
                <IconCard 
                    icon={pikminIcons} 
                    states={pikmins} 
                    setCurrentState={setCurrentPikmin} 
                    setCurrentImage={setCurrentImage}
                />
            </div>
        </div>
    );
};

export default Pikmin;