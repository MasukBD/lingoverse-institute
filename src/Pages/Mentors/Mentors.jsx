import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMentors from '../../Hooks/useMentors';
import { Puff } from 'react-loader-spinner';
import mentorsimg from '../../assets/campus/mentors.jpg';
import SectionCover from '../../SharedComponent/SectionCover';
import MentorCard from '../../SharedComponent/MentorCard';
import AwesomeRevel from '../../Components/CustomAnimation/AwesomeRevel';

const Mentors = () => {
    const { mentors, mentorLoading } = useMentors();

    const [detailedItem, setDetailedItem] = useState(null);

    const handleShowDetails = mentor => {
        setDetailedItem(mentor);
        document.getElementById('my_modal').showModal()
    }

    if (mentorLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Mentors - LingoVerse - Institute</title></Helmet>
            <SectionCover image={mentorsimg} heading={'Meet Our Inspirational Mentors'} subHeading={'Welcome to our Mentors Page, where expertise meets inspiration! Our dedicated team of mentors is committed to guiding you on your educational journey and helping you reach your full potential. Meet the exceptional individuals who bring a wealth of experience, passion, and mentorship to our learning community.'}></SectionCover>
            <div className='w-full my-5 lg:w-11/12 mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                <AwesomeRevel>
                    {
                        mentors.map(mentor => <MentorCard key={mentor._id} handlDetails={handleShowDetails} mentor={mentor}></MentorCard>)
                    }
                </AwesomeRevel>
            </div>
            {/* Mentor Details Modal Here  */}
            <dialog id="my_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <img src={detailedItem?.image} className='rounded-lg w-80' alt="" />
                        <h1 className='font-bold text-2xl'>Name: <span className='text-pink-500'>{detailedItem?.name}</span></h1>
                        <p className='font-semibold'>Contact Details: {detailedItem?.email}</p>
                        <p className='font-semibold'><b>Courses Taken: </b>
                            <span>{detailedItem?.classes_taken} </span>
                            (<span className='text-pink-500'>
                                {detailedItem?.classes?.[0]}
                                {detailedItem?.classes_taken > 1 && <span>, </span>}
                                {detailedItem?.classes?.[1]}
                            </span>)
                        </p>
                        <p><b>Objective: </b>{detailedItem?.details}</p>
                    </div>
                    <div className="modal-action">
                        <form className='w-full flex justify-center items-center' method="dialog">
                            <button className='deafultButton'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Mentors;