import React, { useContext } from "react";
import { postSchema } from "../schemas";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";

function PostForm( { rerenderPost } ) {
    const { user, postForm, setPostForm } = useContext(UserContext)

    const { values, errors, touched, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            title: "",
            body: "",
            category: "All",
        },
        validationSchema: postSchema,
        onSubmit: (values) => {
            fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        resetForm()
                        setPostForm(false)
                        rerenderPost(data)
                    })
                } else {
                    r.json().then(err => console.log(err))
                }
            })
        }
    })

    return (
        <div className={`flex flex-col bg-off-white h-full lg:w-3/5 w-5/6 border-2 rounded-lg  ${postForm && user ? "flex" : "hidden"}`}>
            <form className="flex flex-col h-full w-full p-2 gap-2" onSubmit={handleSubmit} >
                <div>
                    <label>Title</label>
                    <input
                        className={`flex w-full border-2 py-1  px-0.5 ${errors.title && touched.title ? "border-red" : "outline-light-cyan"}`}
                        type="text"
                        id="title"
                        placeholder="max 250 characters..."
                        value={values.title}
                        onChange={handleChange}  
                    />
                    {errors.title && touched.title ? (<p className="text-light-red">{errors.title}</p>) : (<p className="hidden"></p>)}
                </div>
                <div>
                    <label>Post</label>
                    <textarea
                        className={`flex w-full border-2 py-1 px-0.5 ${errors.body && touched.body ? "border-red outline-none" : "outline-light-cyan "}`}
                        rows="4"
                        type="textarea"
                        id="body"
                        placeholder="max 250 characters..."
                        value={values.body}
                        onChange={handleChange}     
                    />
                    {errors.body && touched.body ? (<p className="text-light-red">{errors.body}</p>) : (<p className="hidden"></p>)}
                </div>
                <div className="flex w-1/5">
                    <select
                        className="flex w-full border-2 py-1 px-0.5"
                        type="select"
                        id="category"
                        placeholder="category"
                        value={values.category}
                        onChange={handleChange}
                    >
                        <option value="All">All</option>
                        <option value="Spoilers">Spoilers</option>
                        <option value="Memes">Memes</option>
                        <option value="Info">Info</option>
                        <option value="General">General</option>
                        <option value="Game">Game</option>
                    </select>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <button type="submit" className="flex text-xl items-center justify-center bg-n-green h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2 hover:bg-light-green" >
                        Submit
                    </button>
                    <button type="button" className="flex text-xl items-center justify-center bg-light-red h-fit w-fit rounded-lg px-1 mb-2 font-semibold border-2 hover:bg-red" onClick={() => {
                        setPostForm(false)
                        resetForm()
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostForm;