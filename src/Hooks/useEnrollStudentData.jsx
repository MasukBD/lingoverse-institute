import React, { useContext } from 'react';
import useAxiosSecureCall from './useAxiosSecureCall';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useEnrollStudentData = () => {
    const axiosSecuredCall = useAxiosSecureCall();
    const { user, loading } = useContext(AuthContext);

    const { data: enrollData = [], refetch: enrollRefetch, isloading: enrollDataLoading } = useQuery({
        queryKey: ['enrollData', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecuredCall.get(`/enrolledStudents?email=${user?.email}
            `)
            return response.data;

        }
    })
    return [enrollData, enrollRefetch, enrollDataLoading];
};

export default useEnrollStudentData;