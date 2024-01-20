import React, { useState } from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import useMentors from '../../../Hooks/useMentors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import MentorCard from '../../../SharedComponent/MentorCard';

const FeaturedMentors = () => {
    const { mentors } = useMentors();

    const [detailedItem, setDetailedItem] = useState(null);

    const handleShowDetails = mentor => {
        setDetailedItem(mentor);
        document.getElementById('my_modal').showModal()
    }

    return (
        <>
            <div className='w-full p-2 md:w-11/12 mx-auto'>
                <SectionTitle heading={'HIGHLY QUALIFIED MENTORS'} subHeading={"Secure your seat now before it's too late!"}></SectionTitle>
                <div className='my-5'>
                    <Swiper
                        breakpoints={
                            {
                                200: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                620: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                }
                            }
                        }
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {
                            [...mentors].reverse().slice(0, 6).map(mentor => <SwiperSlide key={mentor._id}><MentorCard mentor={mentor} handlDetails={handleShowDetails}></MentorCard></SwiperSlide>)
                        }
                    </Swiper>
                </div>
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

export default FeaturedMentors;