import React from "react";
// import styles from "./Footer.module.css";
export default function Footer() {
    return (
        <footer className=" bottom-0 left-0 z-20 w-full border-t border-gray-600 bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
            <span className="text-sm text-gray-400 sm:text-center">
                © 2023 All Rights Reserved to ITI
            </span>
            <ul className="flex gap-4 text-sm text-gray-400 sm:text-center">
                <li className="font-bold">Developed by: </li>
                <li className="hover:text-white">
                    <a href="https://www.linkedin.com/in/ayaa-othman/">
                        Aya Othman
                    </a>
                </li>
                <li className="hover:text-white">
                    <a href="https://www.linkedin.com/in/ahmedyousry098/">
                        Ahmed Yousry
                    </a>
                </li>
                <li className="hover:text-white">
                    <a href="https://www.linkedin.com/in/abdelrhman-sherif/">
                        Abdelrahman Sherif
                    </a>
                </li>
            </ul>
        </footer>
    );
}
