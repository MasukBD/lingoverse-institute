import axios from 'axios';

const useAxiosCall = () => {

    const axiosCall = axios.create({
        baseURL: 'https://lingoverse-server.vercel.app',
        timeout: 7000
    })

    return axiosCall;
};

export default useAxiosCall;