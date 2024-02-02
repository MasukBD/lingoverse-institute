import React, { useState } from 'react';
import SectionTitle from '../../SharedComponent/SectionTitle';
import useCourses from '../../Hooks/useCourses';
import { Puff } from 'react-loader-spinner';
import AwesomeRevel from '../../Components/CustomAnimation/AwesomeRevel';
import CourseDetailsCardForAdmin from './CourseDetailsCardForAdmin';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
const imageHostingApiKey = import.meta.env.VITE_IMAGE_HOST_KEY_BY_BB;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;



const ManageAllClasses = () => {
    const { courses, courseRefetch, loading } = useCourses();
    const axiosSecuredCall = useAxiosSecureCall();
    const [selectForUpdate, setSelectForUpdate] = useState(null);

    // Retriving Pending Course Data 
    const { data: pendingCourse = [], refetch: pendingRefech, isLoading: pendingLoading } = useQuery({
        queryKey: ['pendingCourse'],
        queryFn: async () => {
            const response = await axiosSecuredCall.get('/pendingCourse')
            return response.data;
        }
    })

    // Update Button Event Handler 
    const handleUpdateCourse = course => {
        setSelectForUpdate(course);
        document.getElementById('my_modal').showModal();
    };

    // Modal Update Data Button Event Handler 
    const handleUpdatedCourseData = async (e) => {
        const from = e.target;
        const courseName = from.courseName.value;
        const mentorName = from.mentorName.value;
        const courseFee = from.courseFee.value;
        const availableSeat = from.availableSeat.value;
        const courseDetails = from.details.value;
        const image = from.photo.files[0];
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            await fetch(imageHostingUrl, { method: "POST", body: formData })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const updatedPhoto = data.data.display_url;
                        const updatedData = { courseName, mentorName, courseFee, availableSeat, details: courseDetails, image: updatedPhoto };
                        axiosSecuredCall.put(`/courses/${selectForUpdate._id}`, updatedData)
                            .then(res => {
                                if (res.status === 200) {
                                    toast.success('Updated Successfully!');
                                    from.reset();
                                    courseRefetch();
                                }
                            })
                    }
                })
        }
        else {
            const updatedData = { courseName, mentorName, courseFee, availableSeat, details: courseDetails, image: selectForUpdate?.image };
            axiosSecuredCall.put(`/courses/${selectForUpdate._id}`, updatedData)
                .then(res => {
                    if (res.status === 200) {
                        toast.success('Updated Successfully!');
                        from.reset();
                        courseRefetch();
                    }
                })
        }
    }

    // Delete A course From Courses 
    const handleDeleteCousre = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecuredCall.delete(`/courses/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            courseRefetch();
                        }
                    })
            }
        });
    }

    const handlePendingCourseDecline = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecuredCall.delete(`/pendingCourse/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            pendingRefech();
                        }
                    })
            }
        });
    }

    const handlePendingCourseApprove = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "This Course Will be Published!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecuredCall.post(`/courses/${id}`)
                    .then(res => {
                        if (res.data.addedToCourses.insertedId) {
                            Swal.fire({
                                title: "Approved!",
                                text: "Course Is Published!",
                                icon: "success"
                            });
                            courseRefetch();
                            pendingRefech();
                        }
                    })
            }
        });
    }

    if (loading || pendingLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <SectionTitle subHeading={"Courses That Added By Mentor"} heading={"Pending Courses"}></SectionTitle>
            {
                pendingCourse.length < 1 && <p className='mb-5 text-center text-lg font-semibold text-red-500'>No Pending Course!</p>
            }
            {
                pendingCourse.map(course => <div key={course._id} className='border-2 border-blue-600 mb-5 rounded-xl grid grid-cols-1 md:grid-cols-7 lg:grid-cols-6 gap-5 overflow-hidden'>
                    <div className='md:col-span-2 lg:col-span-2'>
                        <img className='hover:scale-110 transition duration-500 rounded-t-xl h-full md:rounded-tr-none w-full md:rounded-l-xl' src={course.image} alt="course-image" />
                    </div>
                    <div className='md:col-span-4 lg:col-span-3 p-2'>
                        <h1 className='text-2xl font-bold text-pink-500'>{course.course_name}</h1>
                        <p className='font-semibold'>Instructor: <span className='text-blue-800 hover:underline hover:cursor-pointer'>{course.mentor_name}</span></p>
                        <h5 className='font-semibold'>Remaining Seats: <span className='text-pink-500'>{course.available_seats}</span></h5>
                        <p><b>Description:</b> {course.details}</p>
                        <div className='flex justify-between items-center flex-col md:flex-row gap-3 my-2'>
                            <h1 className='text-2xl'><b>Tution Fee: </b><span className='text-pink-500 font-bold'>{course.course_fee} $</span></h1>
                            <button title='If you want to update details curriculam then Update from drive where the file has been uplaoded' className='text-blue-500 underline hover:no-underline'>See Details Curriculam</button>
                        </div>
                    </div>
                    <div className='p-2 flex flex-col gap-3 justify-center items-center'>
                        <button onClick={() => handlePendingCourseApprove(course._id)} className='deafultButton'>Approve Class</button>
                        <button onClick={() => handlePendingCourseDecline(course._id)} className='deafultButton'>Decline Course</button>
                    </div>
                </div>)
            }

            <SectionTitle subHeading={'Before Customize Class Data Please Be Sure'} heading={"Manage All Courses"}></SectionTitle>
            <h3 className='text-center font-bold text-2xl mb-3'>Totol Published Course: <span className='text-pink-500'>{courses.length}</span></h3>
            <AwesomeRevel>
                {
                    courses.map(course => <CourseDetailsCardForAdmin handleDeleteCousre={handleDeleteCousre} handleUpdateCourse={handleUpdateCourse} course={course} key={course._id} ></CourseDetailsCardForAdmin>)
                }
            </AwesomeRevel>
            {/* Modal Content Here  */}
            <dialog id="my_modal" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <h3 className="font-bold text-center text-xl text-blue-900">Update Course Data!</h3>
                    <div className="modal-action">
                        <form onSubmit={handleUpdatedCourseData} className='w-full p-2 space-y-3' method="dialog">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <div>
                                    <label className='font-semibold'>Course Name <span className='text-red-600'>*</span></label><br />
                                    <input className='w-full p-2 rounded-lg border' required defaultValue={selectForUpdate?.course_name} type="text" name="courseName" id="courseName" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Mentor Name <span className='text-red-600'>*</span></label><br />
                                    <input className='w-full p-2 rounded-lg border' required defaultValue={selectForUpdate?.mentor_name} type="text" name="mentorName" id="mentorName" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                <div>
                                    <label className='font-semibold'>Price <span className='text-red-600'>*</span></label><br />
                                    <input className='w-full p-2 rounded-lg border' required defaultValue={selectForUpdate?.course_fee} min="100" max="500" type="number" name="courseFee" id="courseFee" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Available Seats <span className='text-red-600'>*</span></label><br />
                                    <input className='w-full p-2 rounded-lg border' required defaultValue={selectForUpdate?.available_seats} type="number" min="1" max="30" name="availableSeat" id="availableSeat" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='font-semibold'>Current Picture</label><br />
                                    <img src={selectForUpdate?.image} alt="" />
                                </div>
                                <div>
                                    <label className='font-semibold'>Details <span className='text-red-600'>*</span></label><br />
                                    <textarea className='w-full p-2 rounded-lg border' required defaultValue={selectForUpdate?.details} type="text" cols="30" rows="10" name="details" id="details" />
                                </div>
                            </div>
                            <div className=' mt-2'>
                                <label className='font-semibold'>Upload New Photo</label><br />
                                <input name='photo' type="file" className="file-input file-input-bordered file-input-primary w-full max-w-sm" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className='mt-3'><input className='deafultButton' type="submit" value="Update Data" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ManageAllClasses;