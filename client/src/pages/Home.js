import React from "react";
import GuideCard from "../components/GuideCard";

function Home( { cat }) {

    return (
        <div className="flex h-full w-full bg-hero-pattern bg-no-repeat bg-scroll bg-grey items-center justify-center">
            <div className="flex flex-col items-center w-3/5">
                <div className="flex w-fit h-full text-8xl items-center justify-center bg-light-blue">
                    Welcome to the Pikmin 4 Wiki!
                </div>
                <div>
                    <h2>
                        General Announcements 
                    </h2>
                    <ul>
                        <li>
                            <h1>Welcome Pikmin Enthusiasts!</h1>
                            <p>
                                We're thrilled to welcome all Pikmin fans to our dedicated Pikmin game wiki. Whether you're a seasoned explorer or a budding sproutling, this is your go-to destination for all things Pikmin!
                            </p>
                        </li>
                        <li>
                            <h1>New Pikmin Game Updates</h1>
                            <p>
                                Stay tuned for the latest updates on upcoming Pikmin games. We'll be your source for news, trailers, and insider information about what's on the horizon.
                            </p>
                        </li>
                        <li>
                            <h1>Comprehensive Pikmin Guides</h1>
                            <p>
                                Need help rescuing stranded Pikmin or finding elusive treasures? Our comprehensive guides will assist you every step of the way, from Pikmin types to strategy tips.
                            </p>
                        </li>
                        <li>
                            <h1>Community Collaboration</h1>
                            <p>
                                Join our growing Pikmin community! Share your tips, tricks, and fan theories with fellow explorers. Together, we'll conquer the Pikmin world!
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-row flex-wrap h-full w-full items-center justify-evenly">
                    {cat.map((c) => (
                        <GuideCard 
                            key={c.category}
                            cat={c}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Home;