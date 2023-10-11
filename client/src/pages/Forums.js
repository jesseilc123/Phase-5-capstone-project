import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ReplyCard from "../components/ReplyCard";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm"
import ReplyForm from "../components/ReplyForm";

function Forums() {
    const { user, postCategories, postForm, setPostForm, posts, setPosts, allUsers, setAllUsers} = useContext(UserContext)
    
    
    const [activeCat, setActiveCat] = useState("All")

    useEffect(() => {
        window.scroll(0, 0)
        fetch("/users") 
            .then((r) => r.json())
            .then(data => {
                setAllUsers(data)
                console.log(data)
            })

        fetch("/posts") 
            .then((r) => r.json())
            .then(data => {
                setPosts(data.reverse())
            })
    }, []);

    function rerenderPost(e) {
        const newlist = [e, ...posts]
        setPosts(newlist)
    }

    function rerenderReply(e) {
        const newReply = posts.filter(post => {
            if (post.id === e.post_id) {
                return post.replies.push(e)
            } 
            return post
        }).map(post => post)
        setPosts(newReply)
    }

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center "> 
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center">
                <div className="flex flex-col flex-wrap bg-n-green lg:w-[1000px]  h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg border-black border-2">
                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 className="flex text-4xl font-bold m-3 w-full">{posts.length} comments</h2>
                        <div className="flex md:flex-nowrap flex-wrap flex-row w-full rounded-md mr-6">
                            {postCategories.map(c => (
                                <button key={c} className={`flex justify-center h-full w-1/2 min-w-fit border-2 p-2 ${activeCat === c ? "bg-light-blue" : "bg-light-grey"}`} onClick={() => setActiveCat(c)}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                        <div>
                        {!user ? (
                            <div>
                                <p className="bg-off-white rounded-lg border-2 px-2">
                                    Please <Link to="/login" className="underline font-semibold">Login</Link> to reply or post
                                </p>
                            </div>
                            ) : (
                            <div>
                                <button 
                                    className={`bg-off-white rounded-lg border-2 px-2 hover:underline hover:font-semibold ${postForm ? "hidden" : ""}`}
                                    onClick={() => setPostForm(true)}
                                >
                                    Create post
                                </button>
                            </div>
                        )}
                        </div>
                        < PostForm rerenderPost={rerenderPost} />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 mb-8">
                        {posts.filter(post => {
                            if (activeCat === "All") {
                                return post
                            } else if (post.category === activeCat) {
                                return post
                            }
                        }).map(post => ( 
                            <div key={post.id} className="flex flex-col h-full w-5/6  bg-yellow rounded-md outline-dashed">
                                <div className="flex flex-row gap-1 ml-2 mt-2 justify-start items-start ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        {allUsers.filter(oneUser => oneUser.id === post.user_id).map(oneUser => <p key={oneUser.id} className={`font-semibold ${oneUser.id === user.id ? "text-light-blue" : "text-grey"}`}>{oneUser.username}</p>)}
                                    </div>
                                    <p>{(post.created_at).slice(0, 10)}</p>
                                </div>
                                <div className="flex flex-col mx-2 mt-2 pb-2 border-b-[1px]">
                                    <p className="bg-blue text-white w-fit px-2 border-black rounded-lg">{post.category}</p>
                                    <p className="font-bold">{post.title}</p>
                                    <p>{post.body}</p>
                                </div>
                                <p className="flex items-center justify-center border-b-[1px] border-black h-full w-full ">{post.replies.length} replies</p>
                                <div className="flex flex-col h-full w-full justify-center items-center mb-4 px-2">
                                    {post.replies.map(reply => (
                                        < ReplyCard
                                            key={reply.id}
                                            reply={reply}  
                                        />
                                    ))}
                                </div>
                                <ReplyForm post={post} rerenderReply={rerenderReply}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Forums;