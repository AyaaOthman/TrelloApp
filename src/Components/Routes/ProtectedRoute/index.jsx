import React, { useContext } from "react";
import { AuthContext } from "../../../Context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { state, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <div className="flex w-full items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
            </div>
        );
    }
    if (!state.token) {
        return <Navigate to="/login" />;
    }
    return props.children;
};

export default ProtectedRoute;
