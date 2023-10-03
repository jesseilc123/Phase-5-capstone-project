import React from "react";
import { Link } from "react-router-dom";

function GuideCard( { cat }) {
    return (
        <Link to={`/${cat.category.toLowerCase()}`}>
            <button key={cat} className="lg:h-[450px] lg:w-[400px] lg:m-none m-2 h-auto w-auto grid border-black bg-light-cyan border-2 mt-3 p-2 rounded-xl bg-gray-400 shadow-md justify-center">
                <div className="text-2xl items-center justify-center border-black">
                    {cat.category}
                </div>
                    <img className="rounded-xl"src={cat.image} alt={`${cat.category}`}/>
            </button>
        </Link>
    );
};

export default GuideCard;