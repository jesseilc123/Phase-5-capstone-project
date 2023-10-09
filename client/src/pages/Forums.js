import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ReplyCard from "../components/ReplyCard";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

function Forums() {
    const { user, postCategories } = useContext(UserContext)
    
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [replies, setReplies] = useState([])
    const [activeCat, setActiveCat] = useState("All")
    const [postForm, setPostForm] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)
        fetch("http://localhost:5555/posts") 
            .then((r) => r.json())
            .then(data => {
                setPosts(data)
            })

        fetch("http://localhost:5555/replies") 
            .then((r) => r.json())
            .then(data => {
                setReplies(data)
            })

        fetch("http://localhost:5555/users") 
            .then((r) => r.json())
            .then(data => {
                setUsers(data)
            })
    }, []);

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center "> 
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-full items-center justify-center">
                <div className="flex flex-col flex-wrap bg-n-green lg:w-[1000px]  h-full w-full lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg border-black border-2">
                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 className="flex text-4xl font-bold m-3 w-full">{posts.length} comments</h2>
                        <div className="flex md:flex-nowrap flex-wrap flex-row w-full rounded-md mr-6">
                            {postCategories.map(c => (
                                <button className={`flex justify-center h-full w-1/2 min-w-fit border-2 p-2 ${activeCat === c ? "bg-light-blue" : "bg-light-grey"}`} onClick={() => setActiveCat(c)}>
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
                        <div className={`flex flex-col bg-off-white h-full w-3/5 border-2 rounded-lg ${postForm ? "flex" : "hidden"}`}>
                            <form className="flex flex-col h-full">
                                <label>title</label>
                                <label>body</label>
                                <label>category</label>
                                <label>user_id</label>
                            </form>
                            <button onClick={() => setPostForm(false)}>cancel</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 mb-8">
                        {posts.filter(post => {
                            if (activeCat === "All") {
                                return post
                            } else if (post.category === activeCat) {
                                return post
                            }
                            return 0
                        }).map(post => ( 
                            <div key={post.id} className="flex flex-col h-full w-5/6  bg-yellow rounded-md outline-dashed">
                                <div className="flex flex-row gap-1 ml-2 mt-2 justify-start items-start ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div >
                                        {users.filter(user => user.id === post.user_id).map(user => <p>{user.username}</p>)}
                                    </div>
                                    <p>{(post.created_at).slice(0, 10)}</p>
                                </div>
                                <div className="flex flex-col mx-2 mt-2 pb-2 border-b-[1px]">
                                    <p className="bg-blue text-white w-fit px-2 border-black rounded-lg">{post.category}</p>
                                    <p className="font-bold">{post.title}</p>
                                    <p>{post.body}</p>
                                </div>
                                < ReplyCard post={post} users={users} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Forums;