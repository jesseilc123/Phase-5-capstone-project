import React, { useState } from "react";

function IconCard( { icon, states, setCurrentState, setCurrentImage }) {
    const [search, setSearch] = useState("")
    const [activeCard, setActiveCard] = useState("")

    function handleClick(item){
        setActiveCard(item.name)
        states.filter(state => {
            if (state.name === item.name) {
                setCurrentState(state)
                setCurrentImage(item.image)
            }
            return window.scroll(0, 0)
        });
    };

    return (
        <div className="flex flex-col bg-grey py-10 lg:w-[1000px] w-full lg:rounded-b-lg min-h-screen h-full">
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
            <div className="flex flex-row items-start justify-center flex-wrap gap-5 h-full md:min-h-full">
                {icon.filter(item => {
                    if (search === "") {
                        return item
                    }
                    if (item.name.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    }
                    return 0
                }).map((item) => (
                    <button 
                        key={item.name} 
                        className={`flex flex-col h-[300px] w-[300px] bg-light-cyan items-center justify-center rounded-lg hover:border-n-green hover:border-4 ${activeCard === item.name ? "border-n-green border-4 scale-90": ""} border-2`}
                        onClick={() => handleClick(item)}
                    >
                        <img src={item.image} alt={item.name} className="h-48 w-48 rounded-xl bg-white border-2 shadow-md"/>
                        <p className="flex flex-wrap w-fit break-words max-w-[90%] font-bold text-2xl mt-4 bg-off-white px-2 pb-0.5 rounded-xl border-2 shadow-md">
                            {item.name}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IconCard;