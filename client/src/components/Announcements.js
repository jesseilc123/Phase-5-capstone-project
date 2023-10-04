import React, { useState} from "react";

function Announcements() {
    const [announceHidden, setAnnounceHidden] = useState(true);

    return (
        <div className={`flex flex-col bg-off-white border-black p-4 border-2 xl:mt-3 xl:rounded-md rounded-b-sm ${ announceHidden ? "content-none h-14" : "visible h-full"} `}>
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold ">
                    General Announcements 
                </h2>
                { announceHidden ? (
                        <button  onClick={() => setAnnounceHidden(!announceHidden)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex w-6 h-6 text-light-cyan">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    ) : (
                        <button className="flex justify-self-end" onClick={() => setAnnounceHidden(!announceHidden)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex w-6 h-6 text-[#ff0000]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    )
                }
            </div>
            <ul className={`list-decimal ${ announceHidden ? "invisible" : "visible"} mt-2`}>
                <li className="ml-2">
                    <p className="font-semibold">Welcome Pikmin Enthusiasts!</p>
                    <p className="ml-2">
                        We're thrilled to welcome all Pikmin fans to our dedicated Pikmin game wiki. Whether you're a seasoned explorer or a budding sproutling, this is your go-to destination for all things Pikmin!
                    </p>
                </li>
                <li className="ml-2">
                    <h1 className="font-semibold">New Pikmin Game Updates</h1>
                    <p className="ml-2">
                        Stay tuned for the latest updates on upcoming Pikmin games. We'll be your source for news, trailers, and insider information about what's on the horizon.
                    </p>
                </li>
                <li className="ml-2">
                    <h1 className="font-semibold">Comprehensive Pikmin Guides</h1>
                    <p className="ml-2">
                        Need help rescuing stranded Pikmin or finding elusive treasures? Our comprehensive guides will assist you every step of the way, from Pikmin types to strategy tips.
                    </p>
                </li>
                <li className="ml-2">
                    <h1 className="font-semibold">Community Collaboration</h1>
                    <p className="ml-2">
                        Join our growing Pikmin community! Share your tips, tricks, and fan theories with fellow explorers. Together, we'll conquer the Pikmin world!
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default Announcements;