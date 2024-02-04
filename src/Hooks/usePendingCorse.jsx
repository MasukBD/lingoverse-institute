import { useQuery } from '@tanstack/react-query';
import useAxiosSecureCall from './useAxiosSecureCall';

const usePendingCorse = () => {
    const axiosSecuredCall = useAxiosSecureCall();

    const { data: pendingCourse = [], refetch: pendingRefech, isLoading: pendingLoading } = useQuery({
        queryKey: ['pendingCourse'],
        queryFn: async () => {
            const response = await axiosSecuredCall.get('/pendingCourse')
            return response.data;
        }
    })
    return { pendingCourse, pendingRefech, pendingLoading };
};

export default usePendingCorse;