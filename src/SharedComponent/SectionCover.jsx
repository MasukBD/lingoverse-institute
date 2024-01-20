import React from 'react';

const SectionCover = ({ image, heading, subHeading }) => {
    return (
        <div className='relative'>
            <img className='w-full' src={image} alt="" />
            <div className='absolute inset-0 bg-white bg-opacity-90 m-8 md:m-20 lg:m-36 flex items-center justify-center flex-col text-center p-2'>
                <h1 className='mb-2 text-3xl md:text-4xl lg:text-5xl text-pink-500 font-bold text'>{heading}</h1>
                <p className='hidden md:block font-semibold'>{subHeading}</p>
            </div>
        </div>
    );
};

export default SectionCover;