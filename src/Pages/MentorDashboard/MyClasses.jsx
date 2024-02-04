import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../SharedComponent/SectionTitle';
import useCourses from '../../Hooks/useCourses';
import { Puff } from 'react-loader-spinner';
import useMentors from '../../Hooks/useMentors';
import { AuthContext } from '../../Provider/AuthProvider';
import CourseDetailsCard from '../../SharedComponent/CourseDetailsCard';
import usePendingCorse from '../../Hooks/usePendingCorse';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const { courses, loading } = useCourses();
    const { mentors } = useMentors();
    const currentMentor = mentors.find(mentor => mentor.email === user?.email);
    const myCourses = courses.filter(course => course.mentor_name === currentMentor.name);
    const { pendingCourse, pendingRefech, pendingLoading } = usePendingCorse();
    const myPendingCourse = pendingCourse.filter(course => course.mentor_name === currentMentor.name);



    if (loading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>My Class - LingoVerse - Institute</title></Helmet>
            <SectionTitle heading={'Pending Classes'} subHeading={"This Class Will Publish After A Review Of Admin"}></SectionTitle>
            <div className='my-4'>
                {
                    myPendingCourse.length < 1 && loading === false && <p className='text-2xl font-bold text-red-500 mt-5 text-center'>No Pending Class!</p>
                }
                {
                    [...myPendingCourse].reverse().map(course => <CourseDetailsCard key={course._id} course={course}></CourseDetailsCard>)
                }
            </div>
            <SectionTitle heading={'Your Published Classes'} subHeading={"This Classes Now On live!"}></SectionTitle>
            <div className='my-4'>
                {
                    myCourses.length < 1 && loading === false && <p className='text-2xl font-bold text-red-500 mt-5 text-center'>No Class Added Yet!</p>
                }
                {
                    myCourses.map(course => <CourseDetailsCard key={course._id} course={course}></CourseDetailsCard>)
                }
            </div>
        </>
    );
};

export default MyClasses;