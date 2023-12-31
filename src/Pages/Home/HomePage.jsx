import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './HomeComponents/Banner';

const HomePage = () => {
    return (
        <>
            <Helmet><title>Home - LingoVerse - institute</title></Helmet>
            <Banner></Banner>
        </>
    );
};

export default HomePage;