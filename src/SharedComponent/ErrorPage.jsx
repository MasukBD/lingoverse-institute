import React from 'react';
import animation from '../assets/errorpage/error-animation.json';
import Lottie from 'lottie-react';
const ErrorPage = () => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='w-full p-2 md:w-1/2'>
                <Lottie animationData={animation} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default ErrorPage;