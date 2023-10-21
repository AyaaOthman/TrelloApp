import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/auth.context";
// import styles from "./Navbar.module.css";
export default function Navbar() {
    const { state } = useContext(AuthContext);
    const token = state.token;
    return (
        <nav className=" flex w-full justify-center bg-black px-6 py-1  shadow">
            <div className="container flex w-full flex-col items-center text-center sm:flex-row sm:items-baseline sm:justify-between  sm:text-left">
                <div className="flex items-center ">
                    <img src="./logo.png" alt="logo" className="w-16" />
                    <h4 className="text-xl font-bold text-Orange">Todo App</h4>
                </div>
                {token ? (
                    <div>
                        <Link
                            to="/profile"
                            className="ml-2 rounded-md px-3 py-2 text-lg font-bold text-white no-underline hover:bg-Orange">
                            Profile
                        </Link>
                        <Link
                            to="/tasks"
                            className="ml-2 rounded-md px-3 py-2 text-lg font-bold text-white no-underline  hover:bg-Orange">
                            Tasks
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link
                            to="/register"
                            className="ml-2 rounded-md px-3 py-2 text-lg font-bold text-white no-underline hover:bg-Orange">
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="ml-2 rounded-md px-3 py-2 text-lg font-bold text-white no-underline  hover:bg-Orange">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
