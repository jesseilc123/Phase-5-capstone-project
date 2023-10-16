import React, { useContext } from "react";
import pikminlogo from "../utils/pikminLogo.jpg"
import { Link, useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
    const { setView, user, setUser } = useContext(UserContext);
    let location = useLocation();
    let navigate = useNavigate();

    function handleLogout() {
        fetch("/logout", { method: "DELETE" })
            .then(r => {
                if (r.ok) {
                    setUser("")
                    navigate("/login")
                } else {
                    console.log(r)
                }
            })
        }

    return (
        <div className={`fixed top-0 flex-row z-[100] h-24 w-full bg-grey ${location.pathname==="/login" ? "hidden" : "flex"}`}>
            < div className="flex flex-row h-full w-full items-center justify-between">
                <Link to="/" className="flex ml-3 text-white justify-start">
                    <p className="hidden mr-3 lg:text-4xl sm:text-2xl sm:flex items-center">Pikmin Wiki</p>
                    <img src={pikminlogo} alt="Pikmin flower" className="object-scale-down lg:h-10 lg:w-10 h-9 w-9"/>
                </Link>
            </div>
            <div className="flex w-full items-center justify-end">
                {user ? (
                    <div className="flex flex-row gap-2 mr-2">
                        <div className="flex items-center justify-center flex-row bg-light-blue px-2 py-1 rounded-lg gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-yellow text-xl">{user.username}</p>
                        </div>
                        <button className="text-black text-xl px-2 py-1 hover:bg-[#7E8C8C] bg-light-grey rounded-lg"  onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="flex flex-row gap-2 mr-2">                
                        <Link to="/login" className="text-white px-2 py-1 text-xl hover:text-light-grey bg-light-blue rounded-lg" onClick={() => setView("login")}>
                            Login
                        </Link>
                        <Link to="/login" className="text-white px-2 py-1 text-xl hover:text-light-grey bg-light-blue rounded-lg" onClick={() => setView("signup")}>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Navbar;