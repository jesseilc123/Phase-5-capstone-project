import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard";

function Forums() {
    const { user, postCategories, postForm, setPostForm, posts, setPosts, replies, setReplies, setAllUsers} = useContext(UserContext)

    const [activeCat, setActiveCat] = useState("All")

    useEffect(() => {
        window.scroll(0, 0)
        fetch("/users") 
            .then((r) => r.json())
            .then(data => {
                setAllUsers(data)
            })

        fetch("/replies") 
            .then((r) => r.json())
            .then(data => {
                setReplies(data)
            })

        fetch("/posts") 
            .then((r) => r.json())
            .then(data => {
                setPosts(data.reverse())
            })
    }, []);

    function rerenderPost(p) {
        const newlist = [p, ...posts]
        setPosts(newlist)
    }

    function deleteRenderPost(p){
        const newPosts = posts.filter(post => {
            if (post.id !== p.id) {
                return post
            }
        })
        setPosts(newPosts)
    }

    function editRenderPost(p){
        console.log(p)
        const newPosts = posts.map(post => {
            if (post.id === p.id) {
                post.title = p.title
                post.category = p.category
                post.body = p.body
            }
            return post
        })
        setPosts(newPosts)
    }

    return (
        <div className="flex h-full w-full bg-beige bg-hero-pattern-2 bg-repeat items-center justify-center "> 
            <div className="flex flex-col mt-24 xl:ml-12 lg:mb-[70px] max-w-7xl w-fill items-center justify-center">
                <div className="flex flex-col flex-wrap bg-n-green lg:w-[1000px] h-fill min-h-screen w-fill min-w-screen lg:mt-12 pb-8 lg:pb-0  lg:rounded-t-lg border-black border-2">
                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 className="flex text-4xl font-bold m-3 w-full">{posts.length} comments</h2>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                        <div>
                        {!user ? (
                            <div>
                                <div className="bg-off-white rounded-lg border-2 px-2">
                                    Please <Link to="/login" className="underline font-semibold">Login</Link> to reply or post
                                </div>
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
                    <div className="flex flex-wrap flex-row item-center mb-3 justify-center">
                        {postCategories.map(c => (
                            <button key={c} className={`flex min-w-fit border-2 p-2  ${activeCat === c ? "bg-light-blue text-off-white" : "bg-light-grey"}`} onClick={() => setActiveCat(c)}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 mb-8">
                        {posts.filter(post => {
                            if (activeCat === "All") {
                                return post
                            } else if (post.category === activeCat) {
                                return post
                            }
                        }).map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                deleteRenderPost={deleteRenderPost}
                                editRenderPost={editRenderPost}
                            /> 
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Forums;