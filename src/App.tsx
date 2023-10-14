import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        
        {
          path: "register",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        }]
      }])
      return <RouterProvider router={routes}></RouterProvider>;

}

export default App;
