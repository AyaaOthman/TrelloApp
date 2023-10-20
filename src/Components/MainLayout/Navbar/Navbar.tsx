import React from 'react'
import { Link } from 'react-router-dom'
// import styles from "./Navbar.module.css";
export default function Navbar() {
    return (
        <nav className=" flex justify-center py-1 px-6 bg-black shadow  w-full">
            <div className="container flex flex-col text-center items-center sm:flex-row sm:text-left sm:justify-between sm:items-baseline  w-full">
                <div className="flex items-center ">
                    <img src="./logo.png" alt="logo" className="w-16" />
                    <h4 className="text-Orange text-xl font-bold">Todo App</h4>
                </div>
                <div>
                    <Link
                        to="/register"
                        className="text-lg font-bold text-white py-2 px-3 no-underline hover:bg-Orange rounded-md ml-2"
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className="text-lg font-bold text-white no-underline py-2 px-3 hover:bg-Orange rounded-md  ml-2"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}
