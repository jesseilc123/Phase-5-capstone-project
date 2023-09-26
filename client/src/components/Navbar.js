import React from "react";
import pikminlogo from "../utils/pikminLogo.jpg"
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="flex top-0 flex-row z-[100] h-24 w-full bg-grey">
            < div className="flex flex-row h-full w-full items-center justify-between">
                <Link to="/" className="flex ml-3 text-white text-4xl justify-start">
                    <p className="mr-3">Pikmin Wiki</p>
                    <img src={pikminlogo} alt="Pikmin flower" className="object-scale-down h-10 w-10"/>
                </Link>
                <div className="flex justify-end">
                    <form className="flex items-center">
                        <input 
                            className="pl-3 border-2 border-black rounded-lg bg-gray-500 text-white text-2xl leading-tight focus:outline-none focus:border-n-green focus:shadow-outline" 
                            placeholder="Search..."
                            onChange={(e) => console.log(e.target.value)}
                            value={""}
                        />
                    </form>
                </div>
            </div>
            <div className="flex w-full items-center justify-end">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                strokeLinecap="currentColor" 
                className="w-8 h-8 text-white"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

                <button className="text-white text-xl p-3 hover:text-orange-300" onClick={console.log("press")}>
                    Logout
                </button>
            </div>
        </div>
    )
};

export default Navbar;