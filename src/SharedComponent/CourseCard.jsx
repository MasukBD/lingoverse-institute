import React from 'react';
import { HashLink } from 'react-router-hash-link';

const CourseCard = ({ course }) => {
    const { _id, course_name, mentor_name, available_seats, course_fee, image } = course;
    return (
        <div className={available_seats > 0 ? 'bg-base-100 rounded-xl shadow-xl flex flex-col gap-2' : 'bg-red-300 rounded-xl shadow-xl flex flex-col gap-2'}>
            <img className='h-60 rounded-t-xl' src={image} alt="course" />
            <div className='space-y-1 px-2 pb-4'>
                <h2 className='text-2xl font-bold'>{course_name}</h2>
                <h1 className='font-bold text-xl'>Total Fee's: <span className='text-pink-500'>{course_fee} $</span></h1>
                <h3 className='text-lg font-semibold'>Mentor: <HashLink smooth to={`/mentors#${mentor_name}`}><span className='text-pink-500 hover:underline'>{mentor_name}</span></HashLink></h3>
                <h4 className='font-semibold'>Available Seat: <span className='text-red-500'>{available_seats}</span></h4>
                <HashLink smooth to={`/courses#${_id}`}><button className='w-full rounded-lg mt-2 py-2 text-white font-semibold bg-gradient-to-r from-[#222222] to-[#2c29d4]'>View Details</button></HashLink>
            </div>
        </div>
    );
};

export default CourseCard;