import React, { useContext, useState } from "react";
import ReplyCard from "./ReplyCard";
import ReplyForm from "./ReplyForm";
import { UserContext } from "../context/UserContext";

function PostCard({ post, deleteRenderPost }) {
    const [postMenu, setPostMenu] = useState(false)
    const {replies, setReplies, allUsers, user, posts} = useContext(UserContext)

    function handlePostDelete(post) {
        console.log("delete")
        fetch("/posts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": post.id,
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(deleteRenderPost(post))
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }

    function rerenderReply(r) {
        const newlist = [...replies, r]
        setReplies(newlist)
    }

    function editRenderReply(r) {
        const newReplies = replies.map(reply => {
            if (reply.id === r.id) {
                reply.content = r.content
            }
            return reply
        })
        setReplies(newReplies)
    }

    function deleteRenderReplies(r){
        const newReplies = replies.filter(reply => {
            if (reply.id !== r.id) {
                return reply
            }
        })
        setReplies(newReplies)
    }

    return(
        <div className="flex flex-col h-full w-5/6  bg-yellow rounded-md outline-dashed ">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 ml-2 mt-2 justify-start items-start w-full ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                        {allUsers.filter(oneUser => oneUser.id === post.user_id).map(oneUser => <p key={oneUser.id} className={`font-semibold ${oneUser.id === user.id ? "text-light-blue" : "text-grey"}`}>{oneUser.username}</p>)}
                    </div>
                    <div className="flex w-fit">{(post.created_at).slice(0, 10)}</div>
                </div>
                <div className={`flex-row w-full justify-end ${user.id === post.user_id ? "flex" : "hidden"}`}>
                    <div className={`flex-row gap-1 items-center justify-center ${postMenu ? "flex" : "hidden"}`}>
                        <button 
                            className="bg-n-green hover:bg-light-green flex text-md h-fit w-fit rounded-lg px-1 font-semibold border-[1px]"
                            type="button"
                            onClick={() => setPostMenu(false)}
                        >
                            Edit
                        </button>
                        <button 
                            className="bg-light-red hover:bg-red flex text-md h-fill w-fit rounded-lg px-1 font-semibold border-[1px]"
                            type="button"
                            onClick={() => handlePostDelete(post)}
                        >
                            Delete
                        </button>
                    </div>
                    <button onClick={() => setPostMenu(!postMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col mx-2 mt-2 pb-2 ">
                <p className="bg-blue text-white w-fit px-2 border-black rounded-lg">{post.category}</p>
                <p className="font-bold">{post.title}</p>
                <p>{post.body}</p>
            </div>
            <div className="flex items-center justify-center border-y-[1px] border-black mx-2 ">{post.replies.length} replies</div>
            <div >
                {replies.filter(reply => {
                    if (reply.post_id === post.id) return reply
                }).map(reply => (
                    < ReplyCard
                        key={reply.id}
                        editRenderReply={editRenderReply}
                        post={post}
                        reply={reply} 
                        deleteRenderReplies={deleteRenderReplies}
                    />
                ))}
            </div>
            <div className="flex justify-start items-start p-2">
                <ReplyForm post={post} rerenderReply={rerenderReply}/>
            </div>
        </div>
    );
};

export default PostCard;