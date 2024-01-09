import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='mt-10 mb-4 w-full p-2 md:w-5/12 mx-auto text-center'>
            <h1 className='text-3xl lg:text-4xl text-blue-900 different-font-style font-bold'>{heading}</h1>
            <p className='text-sm text-pink-600'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;