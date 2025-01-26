import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard/EmployeeDashboard";
import HrDashboard from "../pages/Dashboard/HrDashboard/HrDashboard";

const Dashboard = () => {
    const isEmployee = false;
    const isAdmin =true;
    const isHR =false;
    return (
        <div>
            {
                isEmployee && <EmployeeDashboard />
            }
            {
                isAdmin && <AdminDashboard />
            }
            {
                isHR && <HrDashboard/>
            }
        </div>
    );
};

export default Dashboard;