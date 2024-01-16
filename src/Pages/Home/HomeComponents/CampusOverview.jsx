import React from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import campus1 from '../../../assets/campus/campus-1.jpg';
import campus2 from '../../../assets/campus/campus-2.jpg';
import campus3 from '../../../assets/campus/campus-3.jpg';
import campus4 from '../../../assets/campus/campus-4.jpg';
import campus5 from '../../../assets/campus/campus-5.jpg';
import ImageDetailsOnHover from '../../../SharedComponent/ImageDetailsOnHover';

const CampusOverview = () => {
    return (
        <div className='bg-pink-100 my-10 p-3'>
            <SectionTitle heading={'CAMPUS OVERVIEW'} subHeading={'Take A Look Our Academic Hub'}></SectionTitle>
            <div className='grid grid-cols-1 w-full lg:w-11/12 mx-auto md:grid-cols-3 gap-5 lg:gap-10 pb-3'>
                <div className='flex gap-3 justify-center flex-col'>
                    <p><span className='text-5xl'>B</span>eyond academics, a well-rounded education involves participation in extracurricular activities. A good campus offers a variety of clubs, sports, cultural events, and leadership opportunities. These activities contribute to personal growth, character development, and a holistic educational experience.</p>
                    <h3 className='md:hidden font-semibold text-center'>To See Details Click The Photo Below</h3>
                    <ImageDetailsOnHover
                        image={campus1}
                        heading={'Campus Environment'}
                        details={'A good campus provides a positive and conducive environment for learning. It offers well-maintained classrooms, libraries, and study spaces that contribute to a focused and inspiring atmosphere.'}>
                    </ImageDetailsOnHover>
                </div>
                <div className='flex gap-3 flex-col'>
                    <ImageDetailsOnHover
                        image={campus2}
                        heading={'Media Classroom'}
                        details={'Welcome to InnovateEd Labs, where classrooms are transformed into dynamic spaces for collaborative learning and innovation. Equipped with state-of-the-art technology, flexible seating arrangements.'}>
                    </ImageDetailsOnHover>
                    <ImageDetailsOnHover
                        image={campus3}
                        heading={'Campus Library'}
                        details={'Pages of Knowledge is a vibrant library at the heart of the academic community. It houses an extensive collection of books, journals, and multimedia resources catering to diverse interests and academic pursuits.'}>
                    </ImageDetailsOnHover>
                </div>
                <div className='flex gap-3 flex-col'>
                    <ImageDetailsOnHover
                        image={campus4}
                        heading={'Flavors Junction'}
                        details={"Flavors Junction is not just a canteen; it's a culinary haven where students and faculty come together to savor a diverse array of delicious meals. From international cuisines to comfort food."}>
                    </ImageDetailsOnHover>
                    <ImageDetailsOnHover
                        image={campus5}
                        heading={'Language Club'}
                        details={'The club provides a welcoming environment for language exchange, cultural immersion, and the joy of learning new languages.'}>
                    </ImageDetailsOnHover>
                </div>
            </div>
        </div>
    );
};

export default CampusOverview;