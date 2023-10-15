import React, { useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const { setUser, social, invalid, setInvalid } = useContext(UserContext)
    let navigate = useNavigate()

    const { values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        setUser(user)
                        setInvalid(false)
                        navigate("/")
                    })
                } else {
                    r.json().then((err) => {
                        console.log(err)
                        setInvalid(true)
                    })
                }
            })
        }
    })  

    return (
        <div className="flex lg:flex-nowrap flex-wrap justify-center flex-row mt-8 gap-4 mx-12 ">
            <div className="flex flex-col lg:w-1/2 w-full">
                <h2 className=" font-bold text-xl justify-center items-center lg:flex hidden mb-1">Sign in with a Social Account</h2>
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
            <div className={`flex flex-col lg:w-1/2 w-full items-center justify-center ${invalid ? "border-2 border-red p-2 rounded-lg": "border-none"}`}>
                <p className="flex font-bold text-xl justify-center">Login with Email</p>
                {invalid ? (<p className="text-red">Invalid email or password</p>) : (<p></p>)}
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col mt-4 h-full lg:w-4/5 w-full">
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1  outline-none ${invalid ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"} ${errors.email && touched.email ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email ? (<p className="text-light-red">{errors.email}</p>) : (<p className="text-white">.</p>)}
                    <input 
                        className={`flex h-full w-full text-xl border-b-2 pb-1 outline-none ${invalid ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"} ${errors.password && touched.password ? "border-light-red hover:border-red focus:border-red" : "border-light-grey hover:border-grey focus:border-grey"}`}
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password ? (<p className="text-light-red">{errors.password}</p>) : (<p className="text-white">.</p>) }
                    <button type="submit" className="flex w-full h-full text-xl items-center justify-center font-bold border-black border-2  rounded-lg bg-blue text-white hover:bg-light-blue">
                        <p className="p-2">Login</p>
                    </button>
                    <div className="flex flex-row wrap items-center justify-center">
                        <p className="flex flex-row flex-wrap items-center justify-center">By creating an account, you agree to&nbsp;
                            <button className="text-light-cyan underline font-bold">Terms of Use</button>
                            &nbsp;and&nbsp;
                            <button className="text-light-cyan underline font-bold">Privacy Policy</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;