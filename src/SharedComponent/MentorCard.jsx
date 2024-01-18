import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import facebook from '../assets/socialIcon/facebook1.png';
import twiter from '../assets/socialIcon/twitter 1.png';
import linkedIn from '../assets/socialIcon/linkedin.png';


const MentorCard = ({ mentor }) => {
    const { _id, name, image, email, classes } = mentor;
    return (
        <div className='bg-base-100 rounded-xl h-[480px] shadow-xl flex flex-col gap-2'>
            <img className='h-60 rounded-t-xl' src={image} alt="Mentor" />
            <div className='mt-auto space-y-1 px-2 pb-4'>
                <h1 className='font-bold text-xl'>Name: <span className='text-pink-500'>{name}</span></h1>
                <h4 className='font-semibold text-sm'>Contact Mail: {email}</h4>
                <p className='font-bold'>Courses Taken: {classes?.length}</p>
                <ul>
                    {
                        classes.map((eachClass, i) => <li className='flex items-center font-semibold gap-2 text-pink-500' key={i}><FaCheck></FaCheck> {eachClass}</li>)
                    }
                </ul>
                <div className='my-2 flex justify-evenly'>
                    <Link to=''><img className='w-8' src={facebook} alt="" /></Link>
                    <Link to=''><img className='w-8' src={twiter} alt="" /></Link>
                    <Link to=''><img className='w-8' src={linkedIn} alt="" /></Link>
                </div>
                <Link to={``}><button className='w-full rounded-lg mt-2 py-2 text-white font-semibold bg-gradient-to-r from-[#222222] to-[#2c29d4]'>View Details</button></Link>
            </div>
        </div>
    );
};

export default MentorCard;