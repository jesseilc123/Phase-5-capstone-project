import React, { useContext, useState, useEffect} from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Login() {
    const { view, setView } = useContext(UserContext)
   
    return (

        <div className="bg-beige h-screen">
            <nav className="flex flex-row flex-wrap items-center justify-center lg:pt-12">
                {view === "login" ? (
                    <div className="flex flex-col bg-white xl:rounded-2xl lg:w-[1000px] lg:h-[900px] h-screen w-full">
                        <div className="flex flex-wrap flex-row justify-center bg-n-green w-full xl:rounded-t-2xl lg:h-[188px]">
                            <Link to="/" className="flex w-full flex-row items-center justify-center"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                <h3 className="text-2xl font-bold underline">BACK TO SITE</h3>
                            </Link>
                            <div className="flex flex-col items-center">
                                <h3 className="text-4xl font-bold">Welcome Back!</h3>
                                <p className="text-lg mt-2 font-semibold">Don't have an account?&nbsp;
                                    <button onClick={() => setView("signup")} className="text-light-cyan underline font-bold">Register now</button>
                                </p>
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                ) : (
                    <div>
                        <h3>Join Pikmin Wiki Today!</h3>
                        <p>Already have an account?&nbsp;
                            <button onClick={() => setView("login")} className="text-light-cyan underline">Sign in</button>
                        </p>
                        <SignupForm />
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Login;