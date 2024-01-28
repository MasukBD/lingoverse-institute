import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './HomeComponents/Banner';
import AfterBanner from './HomeComponents/AfterBanner';
import Faq from './HomeComponents/Faq';
import ContactUs from './HomeComponents/ContactUs';
import FeaturedCourse from './HomeComponents/FeaturedCourse';
import FeaturedMentors from './HomeComponents/FeaturedMentors';
import CampusOverview from './HomeComponents/CampusOverview';
import useCourses from '../../Hooks/useCourses';
import { Puff } from 'react-loader-spinner';
import AwesomeRevel from '../../Components/CustomAnimation/AwesomeRevel';

const HomePage = () => {
    const { loading } = useCourses();
    if (loading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Home - LingoVerse - institute</title></Helmet>
            <Banner></Banner>
            <AfterBanner></AfterBanner>
            <AwesomeRevel>
                <FeaturedCourse></FeaturedCourse>
                <FeaturedMentors></FeaturedMentors>
                <CampusOverview></CampusOverview>
            </AwesomeRevel>
            <ContactUs></ContactUs>
            <AwesomeRevel>
                <Faq></Faq>
            </AwesomeRevel>
        </>
    );
};

export default HomePage;