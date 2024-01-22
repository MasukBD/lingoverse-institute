import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosCall from './useAxiosCall';

const useMentors = () => {
    const axiosCall = useAxiosCall();
    const { data: mentors = [], refetch, isLoading: mentorLoading } = useQuery({
        queryKey: ['mentors'],
        queryFn: async () => {
            const response = await axiosCall.get('/mentors')
            return response.data;
        }
    })
    return { mentors, refetch, mentorLoading };
};

export default useMentors;