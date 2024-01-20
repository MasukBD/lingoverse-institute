import React from 'react';
import useCourses from '../../Hooks/useCourses';
import { Puff } from 'react-loader-spinner';
import CourseDetailsCard from '../../SharedComponent/CourseDetailsCard';
import { Helmet } from 'react-helmet-async';
import bgPhoto from '../../assets/campus/allCoursebg.png';
import SectionCover from '../../SharedComponent/SectionCover';

const Courses = () => {
    const { courses, loading } = useCourses();
    const sortedCourses = courses.sort((a, b) => b.available_seats - a.available_seats);

    if (loading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Courses - LingoVerse - Institute</title></Helmet>
            <SectionCover heading={'All COURSES'} subHeading={'Embark on a linguistic adventure with us and open doors to new connections, travel experiences, and personal growth. Join our multicultural community of learners and start your language learning journey today!'} image={bgPhoto}></SectionCover>
            <div className='w-full md:w-11/12 mx-auto p-2'>
                <p className='flex items-center font-semibold mb-4'><span className='p-1.5 rounded-md text-white bg-red-500'>Notice</span> <marquee><span className='text-red-500'>March Intake 2024 Enrollment is going Now! Deadline for Registration is 23<sup>rd</sup> February. Thank You!</span></marquee></p>
                {
                    sortedCourses.map(course => <CourseDetailsCard course={course} key={course._id}></CourseDetailsCard>)
                }
            </div>
        </>
    );
};

export default Courses;