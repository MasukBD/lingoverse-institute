import React from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import useCourses from '../../../Hooks/useCourses';
import CourseCard from '../../../SharedComponent/CourseCard';
import { Link } from 'react-router-dom';
import { FaBookOpen } from "react-icons/fa";

const FeaturedCourse = () => {
    const { courses } = useCourses();
    const availableCourses = courses.sort((a, b) => b.available_seats - a.available_seats);
    return (
        <div id='courses' className='w-full p-2 md:w-11/12 mx-auto'>
            <SectionTitle heading={'AVAILABLE COURSES NOW'} subHeading={"Secure your seat now before it's too late!"}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-7'>
                {
                    availableCourses.slice(0, 6).map(course => <CourseCard key={course._id} course={course}></CourseCard>)
                }
            </div>
            <div className='flex items-center justify-center'>
                <Link to='/courses'><button className='deafultButton flex gap-1 justify-center items-center'>All Courses <FaBookOpen></FaBookOpen></button></Link>
            </div>
        </div>
    );
};

export default FeaturedCourse;