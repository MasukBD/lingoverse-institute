import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useMentors = () => {
    const { data: mentors = [], refetch, isLoading: mentorLoading } = useQuery({
        queryKey: ['mentors'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/mentors')
            return response.json();
        }
    })
    return { mentors, refetch, mentorLoading };
};

export default useMentors;