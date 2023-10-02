import React, { useContext, useState, useEffect} from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Login() {
    const { view, setView } = useContext(UserContext)
   
    return (

        <div className="bg-beige h-screen lg:h-full">
            <nav className="flex flex-row flex-wrap items-center justify-center pt-12">
                {view === "login" ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl">
                        <div className="flex flex-wrap flex-col items-center justify-center bg-n-green w-[1500px] max-w-6xl max-h-48 rounded-t-2xl">
                            <Link to="/" className="flex w-full flex-row mr-3 mt-12"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                <h3 className="text-2xl font-bold">BACK</h3>
                            </Link>
                            <div>
                                <h3 className="text-4xl font-bold">Welcome Back!</h3>
                                <p className="text-lg mt-2">Don't have an account?&nbsp;
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