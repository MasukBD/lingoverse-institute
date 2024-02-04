import React, { useContext, useState } from 'react';
import SectionTitle from '../../SharedComponent/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import useMentors from '../../Hooks/useMentors';
import { Puff } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOST_KEY_BY_BB;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

const AddAClass = () => {
    const { user, loading } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecuredCall = useAxiosSecureCall();
    const [laoder, setLoader] = useState(false);
    const { mentors, mentorLoading } = useMentors();
    const currentMentor = mentors.find(mentor => mentor.email === user?.email);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoader(true);
        const formData = new FormData();
        formData.append('image', data.photo[0]);
        await fetch(imageHostingUrl, { method: "POST", body: formData })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    const uploadedPhoto = response.data.display_url;
                    const uploadCourse = { course_name: data?.courseName, mentor_name: data?.mentorName, available_seats: parseInt(data?.seats), course_fee: parseInt(data?.courseFee), image: uploadedPhoto, details: data?.details }
                    axiosSecuredCall.post('/pendingCourse', uploadCourse)
                        .then(res => {
                            if (res.status === 200) {
                                setLoader(false);
                                reset();
                                Swal.fire({
                                    title: "Course Added!",
                                    text: "Your course added And Pending For Review!",
                                    icon: "success"
                                });
                                navigate('/dashboard/myClasses');
                            }
                        })
                }
            })

    }

    if (loading || mentorLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }

    return (
        <>
            <Helmet><title>Add A Class - LingoVerse</title></Helmet>
            <SectionTitle heading={'Add A Class'} subHeading={"This Class Will Publish After A Review Of Admin"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='p-2 md:p-6 bg-blue-100 rounded-lg space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10'>
                        <div>
                            <label className='font-semibold'>Course Name <span className='text-red-500'>*</span></label><br />
                            <input className='w-full p-2 rounded-lg border' placeholder='Enter Course Name' type="text" id="CourseName" {...register("courseName", { required: true, maxLength: 60 })} />
                            {/* Showing Name Field Error  */}
                            {errors.courseName?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                            {errors.courseName?.type === 'maxLength' && <span className='text-sm text-red-500'>Name character exceeds limit!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Mentor Name <span className='text-red-500'>*</span></label><br />
                            <input defaultValue={currentMentor?.name} readOnly={currentMentor} {...register("mentorName")} className='w-full p-2 rounded-lg border' placeholder='Enter Your Name' type="text" id="mentorName" />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10'>
                        <div>
                            <label className='font-semibold'>Available Seats <span className='text-red-500'>*</span></label><br />
                            <input className='w-full p-2 rounded-lg border' placeholder='Number of Seats' type="number" min='5' max='25' id="seats" {...register("seats", { required: true })} />
                            {errors.seats?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Course Fees <span className='text-red-500'>*</span></label><br />
                            <input className='w-full p-2 rounded-lg border' placeholder='Accociated Course Fee' type="number" min='100' max='1000' id="courseFee" {...register("courseFee", { required: true })} />
                            {errors.courseFee?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Cover Photo <span className='text-red-500'>*</span></label><br />
                            <input {...register("photo", { required: true })} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                            {errors.photo?.type === 'required' && <span className='text-sm text-red-500'>Photo is required!</span>}
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold'>Course Details <span className='text-red-500'>*</span></label><br />
                        <textarea className='w-full p-2 border rounded-lg' placeholder='Write here a short description Of course  details and a bit of yours teaching Passion' id="details" cols="30" rows="6" {...register("details", { required: true })}></textarea>
                        {errors.details?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='mt-3'><input className='deafultButton' type="submit" value={laoder ? 'Uploading...' : 'Upload Class'} /></button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddAClass;