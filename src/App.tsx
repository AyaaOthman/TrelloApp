import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/MainLayout/Layout";

import Register from "./Views/Auth/Register/Register";
import TasksPage from "./Views/Tasks";
import Login from "./Views/Auth/Login/Login";
import AuthContextProvider from "./Context/auth.context";
import Landing from "./Views/Landing/Landing";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Landing />
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
          element: <TasksPage />,
        },
      ],
    },
  ]);
  return <AuthContextProvider>
    <RouterProvider router={routes}></RouterProvider>;
  </AuthContextProvider>
}

export default App;
