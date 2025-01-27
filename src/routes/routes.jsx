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
import ErrorPage from "../pages/ErrorPage";
import EmployeeDetails from "../pages/Dashboard/HrDashboard/EmployeeDetails";
import EmployeeRecords from "../pages/Dashboard/EmployeeRecords";
import AllEmployee from "../pages/Dashboard/AdminDashboard/AllEmployee";
import Payroll from "../pages/Dashboard/AdminDashboard/Payroll";
import MessageRequest from "../pages/Dashboard/AdminDashboard/MessageRequest";
import PrivateRoute from "./PrivateRoute";
import EmployeePaymentHistory from "../pages/Dashboard/EmployeeDashboard/EmployeePaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: 'contact-us',
        element: <ContactUs />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/user',
        element: <UpdateUser />

      },
      {
        path: "dashboard",
        element: <PrivateRoute>
          <Dashboard />
        </PrivateRoute>,
        children: [
          //....Employee Part.......
          {
            path: "/dashboard/worksheet",
            element: <EmployeeWorkSheet />
          },
          {
            path: "/dashboard/payment-history",
            element: <EmployeePaymentHistory/>
          },
          //HR part..............
          {
            path: "/dashboard/employee-list",
            element: <EmployeeList />
          },
          {
            path: "/dashboard/employee-details",
            element: <EmployeeDetails />
          },
          {
            path: "/dashboard/progress",
            element: <EmployeeRecords />
          },
          //Admin part..........
          {
            path: "/dashboard/employees",
            element: <AllEmployee />
          },
          {
            path: "/dashboard/payroll",
            element: <Payroll />
          },
          {
            path: "/dashboard/message-request",
            element: <MessageRequest />
          }
        ]
      },
    ]
  },
]);