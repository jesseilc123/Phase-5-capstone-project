import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const { setUser, social, setInvalid } = useContext(UserContext)
    const [error, setError] = useState(null)
    let navigate = useNavigate() 

    const { values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            checkbox1: false,
            checkbox2: false,
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        console.log(user)
                        setUser(user)
                        setInvalid(false)
                        navigate("/")
                    })
                } else {
                    r.json().then((err) => {
                        console.log(err)
                        setError(err.message)
                    })
                }
            })
        }
    })

    return (
        <div className="flex lg:flex-nowrap flex-wrap justify-center flex-row mt-8 gap-4 mx-12">
            <div className="flex flex-col lg:w-1/2 w-full">
                <h2 className=" font-bold text-xl justify-center items-center lg:flex hidden mb-1">Signup with a Social Account</h2>
                <div className="flex justify-center items-center flex-col gap-4 xl:mt-4 w-full">
                    {social.map((s) => (
                        <button key={s.platform} className={`flex flex-row items-center h-full w-full p-1 rounded-md ${s.color}`}>
                            <img src={s.image} className="flex justify-start h-7 w-7 p-0.5 m-1 bg-white rounded-sm"/>
                            <div className="flex justify-center text-white text-xs font-semibold">
                                {s.platform} 
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className={`flex flex-col lg:w-1/2 w-full justify-center items-center`}>
                <p className="flex font-bold text-xl justify-center">Signup with Email</p>
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col mt-4 h-full lg:w-4/5 w-full">
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1 border-light-grey hover:border-grey focus:border-grey outline-none ${errors.email && touched.email ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email ? (<p className="text-light-red">{errors.email}</p>) : (<p className="text-white">.</p>)}
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1 border-light-grey hover:border-grey focus:border-grey outline-none ${errors.username && touched.username ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"} ${error ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="username"
                        id="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && touched.username ? (<p className="text-light-red">{errors.username}</p>) : (<p className="text-white">.</p>)}
                    {error ? (<p className="text-light-red">{error}</p>) : (<p className="hidden"></p>)}
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1 border-light-grey hover:border-grey focus:border-grey outline-none ${errors.password && touched.password ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password ? (<p className="text-light-red">{errors.password}</p>) : (<p className="text-white">.</p>)}
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1 border-light-grey hover:border-grey focus:border-grey outline-none ${errors.confirmPassword && touched.confirmPassword ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (<p className="text-light-red">{errors.confirmPassword}</p>) : (<p className="text-white">.</p>)}
                    <div>
                        {errors.confirmPassword && touched.confirmPassword ? (<p className="text-white text-[4px]">.</p>) : (<p className="text-white text-[4px]">.</p>)}
                        <label className="flex flex-row items-center justify-start">
                            <input 
                                className={`h-4 w-4 rounded-md shadow-sm`}
                                type="checkbox"
                                id="checkbox1"
                                value={values.checkbox1}
                                onChange={handleChange}
                            />
                            <p className="pl-2">Email me about WIKI news and events</p>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-row items-center justify-start">
                            <input 
                                className={`h-4 w-4 rounded-md shadow-sm ${errors.checkbox2 && touched.checkbox2 ? "ring-red ring-2 ring-offset-2" : ""}`}
                                type="checkbox"
                                id="checkbox2"
                                value={values.checkbox2}
                                onChange={handleChange}
                            />
                            <p className="pl-2">I agree to:</p>
                        </label>
                        <div className="flex flex-col list-disc pl-4">
                            <li ><span className="cursor-pointer text-light-cyan font-semibold">WIKI's Terms of Use</span></li>
                            <li ><span className="cursor-pointer text-light-cyan font-semibold">Privacy Policy</span></li>
                        </div>
                        {errors.checkbox2 && touched.checkbox2 ? (<p className="text-light-red">{errors.checkbox2}</p>) : (<p className="text-white">.</p>)}
                    </div>
                    <button type="submit" className="flex w-full h-full text-xl items-center justify-center font-bold border-black border-2  rounded-lg bg-blue text-white hover:bg-light-blue">
                        <p className="p-2">REGISTER</p>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;