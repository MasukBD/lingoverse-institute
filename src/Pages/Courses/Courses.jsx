import React from 'react';
import useCourses from '../../Hooks/useCourses';
import SectionTitle from '../../SharedComponent/SectionTitle';
import { Puff } from 'react-loader-spinner';
import CourseDetailsCard from '../../SharedComponent/CourseDetailsCard';
import { Helmet } from 'react-helmet-async';
import bgPhoto from '../../assets/campus/allCoursebg.png';

const Courses = () => {
    const { courses, loading } = useCourses();

    if (loading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Courses - LingoVerse - Institute</title></Helmet>
            <div className='relative'>
                <img src={bgPhoto} alt="" />
                <div className='absolute inset-0 bg-white bg-opacity-80 m-12 lg:m-36 flex items-center justify-center'>
                    <SectionTitle heading={'ALL COURSES'} subHeading={'Currently Available Courses'}></SectionTitle>
                </div>
            </div>
            <div className='w-full md:w-11/12 mx-auto p-2'>
                <p className='flex items-center font-semibold mb-4'><span className='p-1.5 rounded-md text-white bg-red-500'>Notice</span> <marquee><span className='text-red-500'>March Intake 2024 Enrollment is going Now! Deadline for Registration is 23<sup>rd</sup> February. Thank You!</span></marquee></p>
                {
                    courses.map(course => <CourseDetailsCard course={course} key={course._id}></CourseDetailsCard>)
                }
            </div>
        </>
    );
};

export default Courses;