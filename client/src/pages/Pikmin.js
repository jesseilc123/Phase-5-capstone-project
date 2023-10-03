import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../context/UserContext";

function Pikmin() {
    const { pikminIcons } = useContext(UserContext);

    const [pikmins, setPikmins] = useState([])
    useEffect(() => {
        fetch("http://localhost:5555//pikmins") 
            .then((r) => r.json())
            .then(data => {
                setPikmins(data)
            })
    }, []);

    pikmins.forEach((pikmin, index) => {
        pikmin["icon"] = pikminIcons[index].image
    })
    return (
        <div className="flex h-full w-full bg-beige items-center justify-center">
            <div className="flex flex-col mt-24 xl:ml-12 mb-[70px] max-w-7xl">
                <div className="flex  bg-white xl:rounded-2xl lg:w-[1000px] lg:h-[900px] h-screen w-full text-dark-blue">
                    <div>test</div>
                    {/* <div>
                        {pikminIcons.map((item) => (
                            <div key={item.name}>
                                <p>{item.name}</p>
                                <img src={item.image}/>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="flex bg-white xl:rounded-2xl lg:w-[1000px] w-full">
                    {pikmins.map((pikmin) =>(
                        <div key={pikmin.id}>
                            <p>{pikmin.name}</p>
                            <p>{pikmin.icon}</p>
                            <image src={pikmin.icon} />
                        </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pikmin;