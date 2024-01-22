import axios from 'axios';

const useAxiosCall = () => {

    const axiosCall = axios.create({
        baseURL: 'http://localhost:5000',
        timeout: 7000
    })

    return axiosCall;
};

export default useAxiosCall;