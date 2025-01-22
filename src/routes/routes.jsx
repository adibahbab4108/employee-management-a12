import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../Layouts/Dashboard";
import ContactUs from "../pages/ContactUs";

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
        }
      ]
    },
  ]);