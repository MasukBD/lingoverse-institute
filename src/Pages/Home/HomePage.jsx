import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './HomeComponents/Banner';
import AfterBanner from './HomeComponents/AfterBanner';
import Faq from './HomeComponents/Faq';
import ContactUs from './HomeComponents/ContactUs';
import FeaturedCourse from './HomeComponents/FeaturedCourse';
import FeaturedMentors from './HomeComponents/FeaturedMentors';
import CampusOverview from './HomeComponents/CampusOverview';

const HomePage = () => {
    return (
        <>
            <Helmet><title>Home - LingoVerse - institute</title></Helmet>
            <Banner></Banner>
            <AfterBanner></AfterBanner>
            <FeaturedCourse></FeaturedCourse>
            <FeaturedMentors></FeaturedMentors>
            <CampusOverview></CampusOverview>
            <ContactUs></ContactUs>
            <Faq></Faq>
        </>
    );
};

export default HomePage;