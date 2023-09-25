import React from "react";
import pikminlogo from "../utils/pikminLogo.jpg"

function Navbar() {
    return (
        <div className="fixed flex flex-row z-[100] h-24 w-full bg-grey">
            <div className="flex flex-row h-full w-full items-center gap-36 justify-between">
                <button className="flex ml-3 text-white text-4xl justify-start">
                    <p className="mr-3">Pikmin Wiki</p>
                    <img src={pikminlogo} className="object-scale-down h-10 w-10"/>
                </button>
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
                <div className="text-white text-xl p-3">
                    Welcome, &nbsp;<span className="italic text-orange-300">user</span>
                </div>
                <div>
                    <p className="text-white text-xl p-3 hover:text-orange-300">Profile</p>
                </div>
                <button className="text-white text-xl p-3 hover:text-orange-300" onClick={console.log("press")}>
                    Logout
                </button>
            </div>
        </div>
    )
};

export default Navbar;