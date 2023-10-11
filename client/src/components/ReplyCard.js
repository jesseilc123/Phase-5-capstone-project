import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function ReplyCard({ reply, deleteRenderReplies }) {
    const [replyMenu, setReplyMenu] = useState(false)
    const { user, allUsers } = useContext(UserContext)

    function handleReplyDelete() {
        console.log("delete")
        fetch("/replies", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": reply.id,
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(deleteRenderReplies(reply))
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }   

    return (
        <div className="flex flex-col h-full w-full justify-center items-center px-2"> 
            <div className={`flex flex-row ml-8 mt-4 h-full w-full border-l-4 ${user.id === reply.user_id ? "border-light-blue" : "border-grey"}`}>
                <div className="flex flex-col h-full w-full ">
                    <div className="flex flex-row gap-1 h-full w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className={`font-semibold ${user.id === reply.user_id ? "text-light-blue": "text-black"}`}>
                            {allUsers.filter(oneUser => {
                                if (oneUser.id === reply.user_id){
                                    return oneUser
                                }
                            }).map(oneUser => oneUser.username)}
                        </div>
                        <div>
                            {(reply.created_at).slice(0,10)}
                        </div>
                        <div className={`flex flex-row ${user.id === reply.user_id ? "flex" : "hidden"} ${replyMenu ? "bg-off-white border-2 rounded-3xl" : "bg-none"}`}>
                            <button type="button" className={`${user.id === reply.user_id ? "visible" : "hidden"}`} onClick={() => setReplyMenu(!replyMenu)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <div className={`flex-row gap-1 items-center justify-center p-1 ${replyMenu ? "flex" : "hidden"}`}>
                                <button className="bg-n-green hover:bg-light-green flex text-xl h-fit w-fit rounded-lg px-1 font-semibold border-2">
                                    Edit
                                </button>
                                <button 
                                    className="bg-light-red hover:bg-red flex text-xl h-fit w-fit rounded-lg px-1 font-semibold border-2"
                                    onClick={handleReplyDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="flex h-full w-full ml-2">{reply.content}</p>
                </div>
            </div>
        </div>
    )
}

export default ReplyCard;