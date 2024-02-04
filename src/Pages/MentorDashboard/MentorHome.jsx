import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Puff } from 'react-loader-spinner';
import SectionTitle from '../../SharedComponent/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import toast from 'react-hot-toast';
import useMentors from '../../Hooks/useMentors';
import { FaCheck } from 'react-icons/fa';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOST_KEY_BY_BB;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

const MentorHome = () => {
    const { user, loading } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecuredCall = useAxiosSecureCall();
    const [laoder, setLoader] = useState(false);
    const [seeMore, setSeeMore] = useState(true);
    const { mentors, refetch, mentorLoading } = useMentors();
    const currentMentor = mentors.find(mentor => mentor.email === user?.email);

    const onSubmit = async (data) => {
        setLoader(true);
        if (data.photo[0]) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);
            await fetch(imageHostingUrl, { method: "POST", body: formData })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        const uploadedPhoto = response.data.display_url;
                        const updatedData = {
                            name: data.name, email: data.email, courseTaken: data.courseTaken, courses: [data.courseName,
                            ...(data.courseName2 ? [data.courseName2] : [])], image: uploadedPhoto, details: data.details
                        }
                        axiosSecuredCall.put(`/mentors?email=${user?.email}`, updatedData)
                            .then(res => {
                                if (res.status === 200) {
                                    toast.success('Updated Successfully!');
                                    setLoader(false);
                                    reset();
                                    refetch();
                                }
                            })
                    }
                })
        }
        else {
            const updatedData = {
                name: data.name, email: data.email, courseTaken: data.courseTaken, courses: [data.courseName,
                ...(data.courseName2 ? [data.courseName2] : [])], details: data.details
            }
            axiosSecuredCall.put(`/mentors?email=${data?.email}`, updatedData)
                .then(res => {
                    if (res.status === 200) {
                        toast.success('Updated Successfully!');
                        setLoader(false);
                        reset();
                        refetch();
                    }
                })
        }
    }

    if (loading || mentorLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Mentor Dashboard - LingoVerse</title></Helmet>
            <h1 className='text-2xl md:text-3xl lg:text-4xl my-5 font-bold text-blue-900'>Hi! Welcome Back {user.displayName}!</h1>
            <SectionTitle subHeading={'Personalize Your Public Profile'} heading={"Your Profile"}></SectionTitle>
            <div className='w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
                <form className='border-2 border-blue-950 rounded-lg p-2 space-y-3 order-2 md:order-1' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className='font-semibold'>Public Facing Name <span className='text-red-500'>*</span></label><br />
                        <input defaultValue={currentMentor?.name} readOnly={currentMentor} className='w-full p-2 rounded-lg border' placeholder='Enter Your Name' type="text" id="name" {...register("name", { required: true, maxLength: 50 })} />
                        {/* Showing Name Field Error  */}
                        {errors.name?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        {errors.name?.type === 'maxLength' && <span className='text-sm text-red-500'>Name character exceeds limit!</span>}
                    </div>
                    <div>
                        <label className='font-semibold'>Mentor Email <span className='text-red-500'>*</span></label><br />
                        <input defaultValue={user?.email} readOnly {...register("email")} className='w-full p-2 rounded-lg border' placeholder='name@lingoverse.com' type="email" id="email" />
                    </div>
                    <div>
                        <label className='font-semibold'>How Many Courses You Teach? <span className='text-red-500'>*</span></label><br />
                        <input defaultValue={currentMentor?.classes_taken} className='w-full p-2 rounded-lg border' placeholder='Number of Course' type="number" min='1' max='2' id="courseTaken" {...register("courseTaken", { required: true })} />
                        {errors.courseTaken?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div>
                            <label className='font-semibold'>Course Name <span className='text-red-500'>*</span></label><br />
                            <input defaultValue={currentMentor?.classes[0]} className='w-full p-2 rounded-lg border' placeholder='Course Name' type="text" id="courseName" {...register("courseName", { required: true })} />
                            {errors.courseName?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Course Name 2 (if)</label><br />
                            <input defaultValue={currentMentor?.classes?.[1]} className='w-full p-2 rounded-lg border' placeholder='Course Name' type="text" id="courseName2" {...register("courseName2")} />
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold'>Your Objective <span className='text-red-500'>*</span></label><br />
                        <textarea defaultValue={currentMentor?.details} className='w-full p-2 border rounded-lg' placeholder='Write here about you' id="" cols="30" rows="4" {...register("details", { required: true })}></textarea>
                        {errors.details?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                    </div>
                    <div className='mt-2'>
                        <label className='font-semibold'>Upload Your Photo</label><br />
                        <input {...register("photo")} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='mt-3'><input className='deafultButton' type="submit" value={laoder ? 'Updating...' : 'Update Data'} /></button>
                    </div>
                </form>

                {/* Showing Mentor Profile DAta  */}
                {
                    currentMentor && mentorLoading === false ? <div className='order-1 md:order-2 w-full md:w-3/4 mx-auto'>
                        <h3 className='text-center text-xl mb-2 text-blue-800 font-bold hidden md:block'>Current Profile</h3>
                        <div id={currentMentor?.name} className='bg-base-100 rounded-xl mb-6 shadow-xl'>
                            <img className='rounded-t-xl' src={currentMentor?.image} alt="Mentor" />
                            <div className='space-y-1 px-2 pb-4'>
                                <h1 className='font-bold text-xl'>Name: <span className='text-pink-500'>{currentMentor?.name}</span></h1>
                                <h4 className='font-semibold text-sm'>Contact Mail: {currentMentor?.email}</h4>
                                <p className='font-bold'>Courses Taken: {currentMentor?.classes_taken}</p>
                                <ul>
                                    {
                                        currentMentor?.classes.map((eachClass, i) => <li className='flex items-center font-semibold gap-2 text-pink-500' key={i}><FaCheck></FaCheck> {eachClass}</li>)
                                    }
                                </ul>
                                <p><b>Objective: </b>{seeMore ? currentMentor?.details.substring(0, 215) : currentMentor?.details} <button className='underline text-blue-700 font-semibold' onClick={() => setSeeMore(!seeMore)}>{seeMore ? 'See More' : 'See Less'}</button></p>
                            </div>
                        </div>
                    </div>
                        :
                        <p className='order-1 md:order-2 font-semibold my-10 text-center text-red-500'>No Public Profile Uploaded!</p>
                }
            </div>
        </>
    );
};

export default MentorHome;