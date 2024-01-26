import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const EnrolledCourseCard = ({ enrollDetails }) => {
    const { courseEnrolled, courseId, date, paymentStatus, studentId, trnxId, _id, mentor } = enrollDetails;

    return (
        <div className='border-2 border-blue-700 rounded-lg p-2 mt-4 space-y-1'>
            <HashLink to={`/courses#${courseId}`}><h3 className='text-xl font-bold text-pink-600 hover:underline hover:cursor-pointer'>{courseEnrolled}</h3></HashLink>
            <h5 className='font-semibold'>Mentor: <HashLink to={`/mentors#${mentor}`}>{mentor}<span className='text-blue-600 hover:underline'></span></HashLink></h5>
            <p className='font-semibold text-sm'>Course Id: {courseId}</p>
            <p>Date Enrolled: {date}</p>
            <div className='flex justify-between text-lg font-semibold gap-3'>
                <h4>Payment Stutus: {paymentStatus}</h4>
                <h5>Student Id: <span className='text-pink-600'>{studentId}</span></h5>
            </div>
            <p className='text-sm font-semibold'>Transaction Id: {trnxId}</p>
        </div>
    );
};

export default EnrolledCourseCard;