import React from 'react';
import { HashLink } from 'react-router-hash-link';
import useCart from '../Hooks/useCart';

const CourseDetailsCard = ({ course, handleEnrollButton }) => {
    const { _id, course_name, mentor_name, available_seats, course_fee, image, details } = course;

    const [cart] = useCart();
    const cartItem = cart.find(item => item.courseName === course_name);


    return (
        <div id={_id} className='border-2 border-blue-600 mb-5 rounded-xl grid grid-cols-1 md:grid-cols-7 lg:grid-cols-6 gap-5 overflow-hidden'>
            <div className='md:col-span-2 lg:col-span-2'>
                <img className='hover:scale-110 transition duration-500 rounded-t-xl h-full md:rounded-tr-none w-full md:rounded-l-xl' src={image} alt="course-image" />
            </div>
            <div className='md:col-span-4 lg:col-span-3 p-2'>
                <h1 className='text-2xl font-bold text-pink-500'>{course_name}</h1>
                <p className='font-semibold'>Instructor: <HashLink smooth to={`/mentors#${mentor_name}`}><span className='text-blue-800 hover:underline hover:cursor-pointer'>{mentor_name}</span></HashLink></p>
                <h5 className='font-semibold'>Remaining Seats: <span className='text-pink-500'>{available_seats}</span></h5>
                <p><b>Description:</b> {details}</p>
                <div className='flex justify-between items-center flex-col md:flex-row gap-3 my-2'>
                    <h1 className='text-2xl'><b>Tution Fee: </b><span className='text-pink-500 font-bold'>{course_fee} $</span></h1>
                    <button className='text-blue-500 underline hover:no-underline'>Download Details Curriculam</button>
                </div>
            </div>
            <div className='p-2 flex justify-center items-center'>
                <button disabled={available_seats === 0 || cartItem} onClick={() => handleEnrollButton(course)} className='deafultButton'>{cartItem ? 'Enrolled' : 'Enroll Course'}</button>
            </div>
        </div>
    );
};

export default CourseDetailsCard;