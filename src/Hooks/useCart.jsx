import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecureCall from './useAxiosSecureCall';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecuredCall = useAxiosSecureCall();

    const { data: cart = [], refetch, isLoading: cartLoading } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecuredCall.get(`/courseCart?email=${user?.email}`)
            return response.data;
        }
    })
    return [cart, refetch, cartLoading];
};

export default useCart;