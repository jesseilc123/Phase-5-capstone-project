import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import { replySchema } from "../schemas";

function ReplyCard({ reply, deleteRenderReplies, editRenderReply }) {
    const [replyMenu, setReplyMenu] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const { user, allUsers } = useContext(UserContext)

    const { values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            id: reply.id,
            content: reply.content,
        },
        validationSchema: replySchema, 
        onSubmit: (values) => {
            fetch("/replies", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        editRenderReply(data)
                        setEditForm(false)
                        resetForm()
                    })
                } else {
                    r.json().then((err) => console.log(err))
                }
            })
        }
    })

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
                        <div className={`flex flex-row ${user.id === reply.user_id ? "flex" : "hidden"}`}>
                            <button type="button" className={`${user.id === reply.user_id ? "visible" : "hidden"}`} onClick={() => setReplyMenu(!replyMenu)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </button>
                            <div className={`flex-row gap-1 items-center justify-center ${replyMenu ? "flex" : "hidden"}`}>
                                <button 
                                    className="bg-n-green hover:bg-light-green flex text-md h-fit w-fit rounded-lg px-1 font-semibold border-[1px]" 
                                    onClick={() => {
                                        setEditForm(true)
                                        setReplyMenu(false)
                                    }}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-light-red hover:bg-red flex text-md h-fill w-fit rounded-lg px-1 font-semibold border-[1px]"
                                    onClick={handleReplyDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {editForm ? (
                            <div className="flex h-full w-5/6 md:w-2/5">
                                <form onSubmit={handleSubmit} className="flex flex-wrap w-full flex-row h-full items-center justify center gap-4 ml-4">
                                    <div className="flex flex-col w-full">
                                        <textarea 
                                            className={`flex w-full  mt-3 p-1 border-2 rounded-md ${editForm ? "" : "hidden"} ${errors.content && touched.content ? "border-red outline-none" : "outline-light-cyan"}`}
                                            id="content"
                                            rows={2}
                                            placeholder="max 250 characters..."
                                            value={values.content}
                                            onChange={handleChange}
                                        />
                                        <div>
                                            {errors.content && touched.content ? (<p className="text-light-red">{errors.content}</p>) : (<p className="hidden"></p>)}
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <button 
                                            type="submit"
                                            className=" bg-n-green hover:bg-light-green flex text-xl h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2"
                                        >
                                            Confirm
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setEditForm(false)}
                                            className="bg-light-red hover:bg-red flex text-xl h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-wrap h-full w-[90%] ml-2">{reply.content}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyCard;