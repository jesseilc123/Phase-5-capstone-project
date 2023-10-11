import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { replySchema } from "../schemas";
import { UserContext } from "../context/UserContext";

function ReplyForm ({ rerenderReply, post}) {
    const { user } = useContext(UserContext)
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
            <button className={`mt-4  bg-light-grey px-2 rounded-lg border-2 hover:bg-off-white font-semibold ml-4 mb-2 ${viewReplies ? "hidden" : "flex"}`} onClick={() => setViewReplies(true)}>Reply</button>
            <div className={`flex items-center justify-start h-full w-full ${viewReplies ? "flex" : "hidden"}`}>
                <form onSubmit={handleSubmit} className="flex flex-wrap w-full flex-row h-full items-center justify center gap-4 ml-4">
                    <div className="flex flex-col w-full">
                        <textarea 
                            className={`flex w-full  mt-3 p-1 border-2 rounded-md ${viewReplies ? "" : "hidden"} ${errors.content && touched.content ? "border-red outline-none" : "outline-light-cyan"}`}
                            id="content"
                            rows={2}
                            placeholder="max 250 characters..."
                            value={values.content}
                            onChange={handleChange}
                        />
                        <p>{errors.content && touched.content ? (<p className="text-light-red">{errors.content}</p>) : (<p className="hidden"></p>)}</p>
                    </div>
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