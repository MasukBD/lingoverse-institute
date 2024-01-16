import React from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';

const FeaturedCourse = () => {
    return (
        <div id='courses' className='w-full p-2 md:w-11/12 mx-auto'>
            <SectionTitle heading={'AVAILABLE COURSES NOW'} subHeading={"Secure your seat now before it's too late!"}></SectionTitle>
        </div>
    );
};

export default FeaturedCourse;