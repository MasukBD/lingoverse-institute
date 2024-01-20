import React from 'react';

const CampusImageDetailsOnHover = ({ image, heading, details }) => {
    return (
        <div className='relative overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:cursor-pointer'>
            <img src={image} alt="" />
            <div className='absolute inset-0 bg-black bg-opacity-85 flex flex-col gap-1 justify-center p-2 text-white opacity-0 hover:opacity-100 transition duration-300 rounded-l'>
                <h2 className='text-2xl font-semibold'>{heading}</h2>
                <p>{details}</p>
            </div>
        </div>
    );
};

export default CampusImageDetailsOnHover;