import React from "react";
import { Link } from "react-router-dom";

function GuideCard( { cat }) {
    return (
        <Link to={`/${cat.category.toLowerCase()}`}>
            <button key={cat} className="flex flex-col lg:h-[450px] lg:w-[400px] lg:m-none m-2 h-auto w-auto border-black bg-hero-pattern-3 bg-light-cyan bg-pattern-3 border-2 mt-3 p-2 rounded-xl bg-gray-400 shadow-md items-center justify-evenly gap-8">
                <div className="flex bg-off-white items-center justify-center border-black rounded-xl py-2 w-3/5 mt-3 border-2 shadow-md">
                    <p className="flex items-center justify-center text-4xl font-semibold">
                        {cat.category}
                    </p>
                </div>
                    <img className="flex justify-start items-start rounded-xl border-2 shadow-md"src={cat.image} alt={`${cat.category}`}/>
            </button>
        </Link>
    );
};

export default GuideCard;