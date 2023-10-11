import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { replySchema } from "../schemas";
import { UserContext } from "../context/UserContext";

function ReplyForm ({ rerenderReply, post}) {
    const { user, posts } = useContext(UserContext)
    const [viewReplies, setViewReplies] = useState(false);

    const { values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            content: "",
            post_id: post.id,
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
                    r.json().then((data) => {
                        rerenderReply(data)
                        setViewReplies(false)
                        resetForm()
                    })
                } else {
                    r.json().then((err) => console.log(err))
                }
            })
        }
    })

    return(
        <div className={!user ? "hidden" : ""}>
            <button className={`mt-4 ${viewReplies ? "hidden" : "flex"}`} onClick={() => setViewReplies(true)}>Reply</button>
            <div className={`flex items-center justify-start h-full w-full ${viewReplies ? "flex" : "hidden"}`}>
                <form onSubmit={handleSubmit} className="flex flex-wrap w-full flex-row h-full items-center justify center gap-4 ml-8">
                    <textarea 
                        className={`flex w-[90%] md:w-3/5 mt-3 p-1 border-2 rounded-md ${viewReplies ? "" : "hidden"}`}
                        id="content"
                        rows={2}
                        value={values.content}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row gap-3">
                        <button 
                            type="submit"
                            className=" bg-n-green hover:bg-light-green flex text-xl h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2"
                        >
                            Submit
                        </button>
                        <button 
                            type="button"
                            onClick={() => setViewReplies(false)}
                            className="bg-light-red hover:bg-red flex text-xl h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReplyForm;