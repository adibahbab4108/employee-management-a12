import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../Layouts/Dashboard";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateUser from "../pages/UpdateUser ";
import EmployeeWorkSheet from "../pages/Dashboard/EmployeeDashboard/EmployeeWorkSheet";
import EmployeeList from "../pages/Dashboard/HrDashboard/EmployeeList";

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
          path:'/user',
          element:<UpdateUser/>
          
        },
        {
            path:"dashboard",
            element:<Dashboard/>,
            children:[
                {
                  path:"/dashboard/worksheet",
                  element:<EmployeeWorkSheet/>
                },
                {
                  path:"/dashboard/employee-list",
                  element:<EmployeeList/>
                }
            ]
        },
      ]
    },
  ]);