import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUserRole from "../hooks/useUserRole";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard/EmployeeDashboard";
import HrDashboard from "../pages/Dashboard/HrDashboard/HrDashboard";
import FiredMessage from "../components/FiredMessage";

const Dashboard = () => {
    const { userRole, isLoading, isError } = useUserRole();
    const { user, logOut } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data:firedUser } = useQuery({
        queryKey: ["firedUser"],
        queryFn: async () => {
            if (user) {
                const { data } = await axiosPublic.get(`/fired-user?email=${user.email}`);
                return data
            }
        }
    })
    if(user?.email===  firedUser?.email){
        return <FiredMessage/>
    }

    if (isLoading) return <LoadingSpinner />
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