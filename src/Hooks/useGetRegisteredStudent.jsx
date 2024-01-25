import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecureCall from './useAxiosSecureCall';
import { useQuery } from '@tanstack/react-query';

const useGetRegisteredStudent = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecuredCall = useAxiosSecureCall();

    const { data: registeredStudentData = null, refetch, isLoading } = useQuery({
        queryKey: ['registeredStudentData', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecuredCall.get(`/register?email=${user?.email}`)
            return res.data;
        }
    })
    return [registeredStudentData, refetch, isLoading];
};

export default useGetRegisteredStudent;