import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setUser, social } = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then(r => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                });
            }
        })
    }   

    return (
        <div className="flex lg:flex-nowrap flex-wrap justify-center flex-row mt-8 gap-4 mx-12">
            <div className="flex flex-col lg:w-1/2 w-full">
                <h2 className=" font-bold text-xl justify-center items-center lg:flex hidden">Sign in with a Social Account</h2>
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
            <div className="flex flex-col lg:w-1/2 w-full">
                <p className="flex font-bold text-xl justify-center">Sign in with Email</p>
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col mt-4 h-full w-full">
                    <input 
                        className="w-fill text-xl underline outline-none shadow-md"
                        type="text"
                        id="username"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="w-full text-xl underline outline-none"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                    />
                    {<p></p>}
                    <button type="submit" className="flex w-full h-full text-xl items-center justify-center font-bold border-black border-2  rounded-lg bg-blue text-white hover:bg-light-blue">
                        Login
                    </button>
                    <div className="flex items-center justify-center">
                        <p>By creating an account, you agree to&nbsp;
                            <button className="text-light-cyan underline font-bold">Terms of Use</button> and 
                            <button className="text-light-cyan underline font-bold">Privacy Policy</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;