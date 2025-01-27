import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserInfo = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { refetch, data: userData = null, isLoading, isError, error } = useQuery({
        queryKey: ["userInformation"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/users?email=${user?.email}`);
        
            return data;
        },
        enabled: !!user?.email, // Only run the query if the email exists
    });

    return { refetch, userData, isLoading, isError, error };
};

export default useUserInfo;
