import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import facebook from '../assets/socialIcon/facebook1.png';
import twiter from '../assets/socialIcon/twitter 1.png';
import linkedIn from '../assets/socialIcon/linkedin.png';


const MentorCard = ({ mentor, handlDetails }) => {
    const { _id, name, image, email, classes, classes_taken, details } = mentor;

    return (
        <>
            <div id={name} className='bg-base-100 rounded-xl h-[480px] mb-6 shadow-xl flex flex-col gap-2'>
                <img className='h-60 rounded-t-xl' src={image} alt="Mentor" />
                <div className='mt-auto space-y-1 px-2 pb-4'>
                    <h1 className='font-bold text-xl'>Name: <span className='text-pink-500'>{name}</span></h1>
                    <h4 className='font-semibold text-sm'>Contact Mail: {email}</h4>
                    <p className='font-bold'>Courses Taken: {classes_taken}</p>
                    <ul>
                        {
                            classes.map((eachClass, i) => <li className='flex items-center font-semibold gap-2 text-pink-500' key={i}><FaCheck></FaCheck> {eachClass}</li>)
                        }
                    </ul>
                    <div className='flex justify-evenly'>
                        <Link to=''><img className='w-8 my-1.5' src={facebook} alt="" /></Link>
                        <Link to=''><img className='w-8 my-1.5' src={twiter} alt="" /></Link>
                        <Link to=''><img className='w-8 my-1.5' src={linkedIn} alt="" /></Link>
                    </div>
                    <button onClick={() => handlDetails(mentor)} className='w-full rounded-lg py-2 text-white font-semibold bg-gradient-to-r from-[#222222] to-[#2c29d4]'>View Details</button>
                </div>
            </div>
        </>
    );
};

export default MentorCard;