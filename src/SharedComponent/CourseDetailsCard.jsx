import React from 'react';

const CourseDetailsCard = ({ course }) => {
    const { _id, course_name, mentor_name, available_seats, course_fee, image, details } = course;
    return (
        <div id={_id} className='border-2 border-blue-600 mb-5 rounded-xl grid grid-cols-1 md:grid-cols-7 lg:grid-cols-6 gap-5 overflow-hidden'>
            <div className='md:col-span-2 lg:col-span-2'>
                <img className='hover:scale-110 transition duration-500 rounded-t-xl h-full md:rounded-tr-none w-full md:rounded-l-xl' src={image} alt="course-image" />
            </div>
            <div className='md:col-span-4 lg:col-span-3 p-2'>
                <h1 className='text-2xl font-bold text-pink-500'>{course_name}</h1>
                <p className='font-semibold'>Instructor: {mentor_name}</p>
                <h5 className='font-semibold'>Remaining Seats: <span className='text-pink-500'>{available_seats}</span></h5>
                <p><b>Description:</b> {details}</p>
                <div className='flex justify-between items-center flex-col md:flex-row gap-3 my-2'>
                    <h1 className='text-2xl'><b>Tution Fee: </b><span className='text-pink-500 font-bold'>{course_fee} $</span></h1>
                    <button className='text-blue-500 underline hover:no-underline'>Download Details Curriculam</button>
                </div>
            </div>
            <div className='p-2 flex justify-center items-center'>
                <button className='deafultButton'>Enroll Course</button>
            </div>
        </div>
    );
};

export default CourseDetailsCard;