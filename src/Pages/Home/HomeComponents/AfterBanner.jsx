import React from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import slide1 from '../../../assets/afterBanner/slide-1.jpg';
import slide2 from '../../../assets/afterBanner/slide-2.jpg';
import slide3 from '../../../assets/afterBanner/slide-3.jpg';
import slide4 from '../../../assets/afterBanner/slide-4.jpg';
import slide5 from '../../../assets/afterBanner/slide-5.jpg';
import slide6 from '../../../assets/afterBanner/slide-6.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";


const AfterBanner = () => {
    return (
        <div className='my-10'>
            <SectionTitle heading={'Curriculum Content'} subHeading={'Comprehensive Curriculum Syllabus'}></SectionTitle>
            <div className='px-2 grid grid-cols-1 lg:grid-cols-2 w-full lg:w-11/12 mx-auto gap-7 space-y-2'>
                <div>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Celebrating Unity in <span className='text-blue-500'>Diversity</span>, Embracing and Sharing Multilingual and Cultural Riches!</h1>
                    <p className='text-xl md:text-2xl font-semibold'>
                        <span>Learn Here </span>
                        <span style={{ fontFamily: 'Domine' }} className='text-pink-500'>
                            <Typewriter cursorBlinking cursor loop words={['German Language', 'English Language', 'Spanish Language', 'Chinese Language', 'Korean Language', 'Bangla Language', 'Arabic Language', 'French Language', 'Russian Language']}></Typewriter>
                        </span>
                    </p>
                    <p>The syllabus here goes beyond the traditional approach, integrating contemporary and interdisciplinary content to cater to the diverse needs of students. It provides a structured roadmap for educators, outlining the essential topics, learning objectives, and assessment criteria.</p>
                    <Link to='/about'><button className='deafultButton mt-2 flex gap-1 justify-center items-center'>Learn More <FaArrowRight /></button></Link>
                </div>
                <div>
                    <Swiper
                        effect={'coverflow'}
                        centeredSlides={true}
                        grabCursor={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={3}
                        spaceBetween={10}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                    >
                        <SwiperSlide><img className='rounded-md' src={slide1} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded-md' src={slide2} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded-md' src={slide3} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded-md' src={slide4} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded-md' src={slide5} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded-md' src={slide6} alt="" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default AfterBanner;