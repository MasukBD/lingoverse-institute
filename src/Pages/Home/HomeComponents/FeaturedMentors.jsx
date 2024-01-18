import React from 'react';
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

    return (
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
                        mentors.map(mentor => <SwiperSlide key={mentor._id}><MentorCard mentor={mentor}></MentorCard></SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedMentors;