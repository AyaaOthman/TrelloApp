import React, { useContext, useEffect } from "react";
import { AuthContext, IAuthContext } from "../../Context/auth.context";
import { useNavigate } from "react-router-dom";

function Landing() {
    const { login } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const isLoggedIn = login(token);
            if (isLoggedIn) {
                navigate("/tasks");
            }
        } catch (err) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="container flex items-center justify-center">
            <p>Welcome back</p>
        </div>
    );
}

export default Landing;
