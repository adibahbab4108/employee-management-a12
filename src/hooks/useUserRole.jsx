import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useUserRole = () => {
    const { user } = useAuth();
    const [userRole, setUserRole] = useState(null)
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/users?email=${user.email}`);
            return data
        }
    })

    useEffect(() => {
        if (data?.role) {
            setUserRole(data.role);
        }
    }, [data]);

    return { userRole, isLoading, isError };
};

export default useUserRole;