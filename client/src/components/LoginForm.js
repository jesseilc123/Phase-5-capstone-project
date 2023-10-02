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
        <div className="flex flex-wrap items-center justify-evenly flex-row lg:h-[750px] h-full w-1/2 mt-8">
            <div className="flex flex-wrap flex-col lg:w-1/2 w-1/2">
                <h2 className="flex font-bold text-xl justify-center items-center">Sign in with a Social Account</h2>
                <div className="flex flex-col gap-4 mt-4">
                    {social.map((s) => (
                        <button key={s.platform} className={`flex flex-row items-center h-full w-full font-semibold p-2 rounded-md ${s.color}`}>
                            <img src={s.image} className="flex justify-start h-10 w-10 p-1 bg-white rounded-lg"/>
                            <div className="flex items-center text-white text-sm ">
                                {s.platform} 
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col flex-wrap">
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
                    <p>By creating an account, you agree to&nbsp;<button className="text-light-cyan underline font-bold">Terms of Use</button> and <button className="text-light-cyan underline font-bold">Privacy Policy</button></p>
                </form>
            </div>
        </div>
    )
};

export default LoginForm;