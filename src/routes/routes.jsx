import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../Layouts/Dashboard";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateUser from "../pages/UpdateUser ";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"dashboard",
            element:<Dashboard/>
        },
        {
          path:'contact-us',
          element:<ContactUs/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/users/:email',
          element:<UpdateUser/>
          
        }
      ]
    },
  ]);