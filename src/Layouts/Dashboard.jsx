import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard/EmployeeDashboard";
import HrDashboard from "../pages/Dashboard/HrDashboard/HrDashboard";

const Dashboard = () => {
    const { userRole, isLoading, isError } = useUserRole()
    console.log(userRole)
    return (
        <div>
            {
                userRole === "employee" && <EmployeeDashboard />
            }
            {
                userRole === "admin" && <AdminDashboard />
            }
            {
                userRole === "hr" && <HrDashboard />
            }
        </div>
    );
};

export default Dashboard;