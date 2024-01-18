import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCourses = () => {
    const { data: courses = [], refetch, isLoading: loading, isError: courseError } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/courses')
            return response.data;
        }
    })
    return { courses, refetch, loading, courseError };
};

export default useCourses;