import React, { useState, useEffect } from "react";

function Forums() {

    useEffect(() => {
        window.scroll(0, 0)
        fetch("http://localhost:5555/posts") 
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            })
    }, []);

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center "> 
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center">
                <div className="flex flex-wrap items-start justify-start bg-n-green lg:w-[1000px] lg:h-[700px] h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg">
                    <h2 className="text-4xl font-bold">comments</h2>
                </div>
            </div>

        </div>
    );
};

export default Forums;