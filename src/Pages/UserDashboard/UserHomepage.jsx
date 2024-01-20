import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';

const UserHomepage = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Helmet><title>User Dashboard - LingoVerse</title></Helmet>
            <h1 className='text-2xl md:text-3xl lg:text-4xl my-5 font-bold text-blue-900'>Hi! Welcome Back {user.displayName}!</h1>
        </>
    );
};

export default UserHomepage;