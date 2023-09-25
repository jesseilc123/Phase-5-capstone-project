import React, { useState }from "react";

function Sidebar( { cat }) {
    const [active, setActive] = useState(false)

    return (
        <div className={`fixed flex h-full bg-n-green ${active ? "w-48" : "w-12"}`}>
            {active ? (
                <>
                    <div className="flex flex-col mt-[90px]">
                        <div className="text-black">
                            Walkthrough Menu
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            {cat.map((c) => (
                                <button 
                                    key={c.name} 
                                    className="text-2xl pt-3 ml-8 hover:text-orange-300" 
                                    onClick={(e) => console.log(e.target.value)}
                                >
                                    {c.category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="ml-3" onClick={(e) => setActive(!active)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>
                </>
            ) : (
                <>
                    <button className="ml-3" onClick={(e) => setActive(!active)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>
                    </button>
                </>
            )}
        </div>
    )
};

export default Sidebar;