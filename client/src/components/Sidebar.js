import React, { useContext, useState }from "react";
import { Link, useLocation} from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Sidebar() {
    let location = useLocation();
    const { cat, activeSidebar, setActiveSidebar } = useContext(UserContext)

    return (
        <div className={`fixed h-full mt-24 bg-n-green xl:flex hidden border-r-2 ${activeSidebar ? "w-48" : "w-12"} ${location.pathname==="/login" ? "xl:hidden" : "flex"}`}>
            {activeSidebar ? (
                <>
                    <div className="flex flex-col">
                        <div className=" font-semibold w-full ml-2">
                            Walkthrough Menu
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            {cat.map((c) => (
                                <Link to={`/${c.category}`}
                                    key={c.category} 
                                    className="text-2xl pt-3 ml-8 font-semibold hover:text-light-blue" 
                                >
                                    <button onClick={() => setActiveSidebar(!activeSidebar)}>{c.category}</button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <button className="ml-3" onClick={() => setActiveSidebar(!activeSidebar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>
                </>
            ) : (
                <>
                    <button className="ml-3" onClick={() => setActiveSidebar(!activeSidebar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>
                    </button>
                </>
            )}
        </div>
    )
};

export default Sidebar;