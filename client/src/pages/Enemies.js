import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";

function Enemies() {
    const { maps, setMaps, enemyIcons } = useContext(UserContext)
    const [currentEnemy, setCurrentEnemy] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const [search, setSearch] = useState("")

    const [enemies, setEnemies] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5555/enemies") 
            .then((r) => r.json())
            .then(data => {
                setEnemies(data)
            })
        
        fetch("http://localhost:5555/maps") 
            .then((r) => r.json())
            .then(data => {
                setMaps(data)
            })
    }, []);

    function handleClick(item){
        enemies.filter(enemy => {
            if (enemy.name === item.name) {
                setCurrentEnemy(enemy)
                setCurrentImage(item.image)
            }
            return window.scroll(0, 0)
        });
    };

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center ">
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl">
                <div className="flex flex-wrap items-center justify-center bg-n-green lg:w-[1000px] lg:h-[700px] h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg">
                    <div>
                        {currentEnemy === null ? (
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
                                        <img src={currentImage} alt={currentEnemy.name}className="h-72 w-72 rounded-xl"/>
                                        <p className="text-4xl font-bold mt-4">{currentEnemy.name}</p>
                                    </div>
                                    <div className="flex flex-col gap-1 flex-wrap justify-center mx-4 mt-4 pb-3 border-[3px] rounded-md h-full md:w-1/3 w-full">
                                        <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Stats</h2>
                                        <p className="text-lg font-semibold ml-1">
                                            <span className="bg-beige rounded-xl pb-1 px-2">Name:</span> 
                                            <span> {currentEnemy.name}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Weight:</span> 
                                            <span> {currentEnemy.weight}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">Sparklium:</span>
                                            <span> {currentEnemy.sparklium}</span>
                                        </p>
                                        <p className="text-lg font-semibold ml-1" >
                                            <span className="bg-beige rounded-xl pb-1 px-2">location:</span>
                                            <span> {maps.filter(map => map.id === currentEnemy.location).map(name => name.name)}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col  h-fit mt-8 lg:mx-12 mx-4 border-[3px] rounded-lg">
                                    <h2 className="flex text-2xl font-bold items-center justify-center border-b-[3px] bg-beige rounded-t-md">Description</h2>
                                    <p className="text-lg font-medium tracking-wide p-2">{currentEnemy.description}</p>
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col bg-grey py-10 lg:w-[1000px] w-full lg:rounded-b-lg min-h-[480px]">
                    <form className="flex items-center justify-center p-3">
                        <div className="flex flex-row items-center justify-between h-full xs:w-3/5 w-5/6 mb-8 bg-beige rounded-xl focus:outline-2 focus:outline-n-green">
                            <input 
                                className="text-xl outline-none bg-beige p-2 rounded-xl w-full" 
                                placeholder="Search by Name"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 hover:text-[#808080]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-[#ff0000] mr-2" onClick={() => setSearch("")}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </form>
                    <div className="flex flex-row items-center justify-center flex-wrap gap-5">
                        {enemyIcons.filter(item => {
                            if (search === "") {
                                return item
                            }
                            if (item.name.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }
                        }).map((item) => (
                            <button 
                                key={item.name} 
                                className={`flex flex-col h-[300px] w-[300px] bg-light-cyan items-center justify-center rounded-sm hover:border-n-green hover:border-4 focus:border-n-green focus:border-4 focus:scale-90`}
                                onClick={() => handleClick(item)}
                            >
                                <img src={item.image} alt={item.name} className="h-48 w-48 rounded-xl"/>
                                <p className="font-bold text-2xl mt-4">{item.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enemies;