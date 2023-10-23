import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/MainLayout/Layout";

import Register from "./Views/Auth/Register/Register";
import TasksPage from "./Views/Tasks";
import Login from "./Views/Auth/Login/Login";
import AuthContextProvider from "./Context/auth.context";
import Landing from "./Views/Landing/Landing";
import ProfilePage from "./Views/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";

const queryClient = new QueryClient();
const routes = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Landing />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "tasks",
                element: (
                    <ProtectedRoute>
                        <TasksPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
        ],
    },
]);
function App() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={routes}></RouterProvider>;
            </QueryClientProvider>
        </AuthContextProvider>
    );
}

export default App;
