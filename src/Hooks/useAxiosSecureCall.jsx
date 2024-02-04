import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAxiosSecureCall = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('access-token');

    const axiosSecuredCall = axios.create({
        baseURL: 'https://lingoverse-server.vercel.app',
        timeout: 5000
    })

    useEffect(() => {
        // Secure Request 
        axiosSecuredCall.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            }
        },
            async (error) => {
                throw error;
            });
        //Sequre Response
        axiosSecuredCall.interceptors.response.use((response) => {
            return response;
        },
            async (error) => {
                const status = error.response.status;
                if (error.response && (status === 401 || status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                throw error;
            });
    }, [logOut, navigate, axiosSecuredCall])

    return axiosSecuredCall;
};

export default useAxiosSecureCall;