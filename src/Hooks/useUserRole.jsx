import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecureCall from './useAxiosSecureCall';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecuredCall = useAxiosSecureCall();
    const { data: userRole = null, refetch: userRoleRefetch, isLoading: userRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecuredCall.get(`/users/${user?.email}`)
            return response.data;
        }
    })
    return { userRole, userRoleRefetch, userRoleLoading };
};

export default useUserRole;