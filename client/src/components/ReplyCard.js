import React, { useState } from "react";
import { useFormik } from "formik";
import { replySchema } from "../schemas";

function ReplyCard({ post, users}) {
    const [viewReplies, setViewReplies] = useState(false)

    const { values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: replySchema, 
        onSubmit: (values) => {
            fetch("/replies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((data) => console.log(data))
                } else {
                    r.json().then((err) => console.log(err))
                }
            })
        }
    })

    return(
        <div className="flex flex-col h-full w-full justify-center items-center mb-4 px-2">
            <p className="flex items-center justify-center border-b-[1px] border-black h-full w-full ">{post.replies.length} replies</p>
            <div className="flex flex-col h-full w-full">
                {post.replies.map(reply => (
                    <div key={reply.id}className="flex flex-row ml-8 mt-4 h-full w-full border-l-4 border-[#808080
                    ]">
                        <div className="flex flex-col h-full w-full ">
                            <div className="flex flex-row gap-1 h-full w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p>{users.filter(user => {
                                    if (user.id === reply.user_id){
                                        return user
                                    }
                                    return 0
                                    }).map(user => user.username)}
                                </p>
                                <p>
                                    {(reply.created_at).slice(0,10)}
                                </p>
                            </div>
                            <p className="flex h-full w-full ml-2">{reply.content}</p>
                        </div>
                    </div>
                ))}
                <button className="mt-4" onClick={() => setViewReplies(!viewReplies)}>Reply</button>
                <form onSubmit={handleSubmit}>
                    <input 
                        className={`${viewReplies ? "flex" : "hidden"}`}
                        id="content"
                        value={values.content}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default ReplyCard;