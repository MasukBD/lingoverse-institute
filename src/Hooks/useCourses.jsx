import { useQuery } from '@tanstack/react-query';
import useAxiosCall from './useAxiosCall';

const useCourses = () => {
    const axiosCall = useAxiosCall();
    const { data: courses = [], refetch: courseRefetch, isLoading: loading, isError: courseError } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await axiosCall.get('/courses')
            return response.data;
        }
    })
    return { courses, courseRefetch, loading, courseError };
};

export default useCourses;