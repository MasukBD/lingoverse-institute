import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './HomeComponents/Banner';
import AfterBanner from './HomeComponents/AfterBanner';

const HomePage = () => {
    return (
        <>
            <Helmet><title>Home - LingoVerse - institute</title></Helmet>
            <Banner></Banner>
            <AfterBanner></AfterBanner>
        </>
    );
};

export default HomePage;