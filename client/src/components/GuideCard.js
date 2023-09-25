import React from "react";

function GuideCard( { cat }) {
    return (
        <div key={cat} className="h-[500px] w-[500px] grid border-black border-2 mt-3 p-2 rounded-xl mx-2 bg-gray-400 shadow-md">
            <div>{cat.category}</div>
            <img src={cat.image}/>
        </div> 
    );
};

export default GuideCard;