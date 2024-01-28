import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import useGetRegisteredStudent from '../../Hooks/useGetRegisteredStudent';
import useEnrollStudentData from '../../Hooks/useEnrollStudentData';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import EnrolledCourseCard from '../../SharedComponent/EnrolledCourseCard';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import Swal from 'sweetalert2';

const UserHomepage = () => {
    const { user } = useContext(AuthContext);
    const [registeredStudentData, refetch, isLoading] = useGetRegisteredStudent();
    const [enrollData, enrollRefetch, enrollDataLoading] = useEnrollStudentData();
    const [disableForm, setDisableForm] = useState(true);
    const axiosSecuredCall = useAxiosSecureCall();


    const handleUpdateStudentRegisterData = event => {
        event.preventDefault();
        const from = event.target;
        const fullName = from.name.value;
        const phone = from.phone.value;
        const nationality = from.nationality.value;
        const address = from.address.value;
        const passport = from.passport.value;
        const updatedRegisterData = { fullName, phone, nationality, address, passport };
        axiosSecuredCall.put(`/register/${registeredStudentData._id}`, updatedRegisterData)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    setDisableForm(true);
                    // Sweet Alert Starts Here 
                    let timerInterval;
                    Swal.fire({
                        title: "Registered Data Updating!",
                        html: "Update Will Finish <b></b> milliseconds.",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            // Alert Shown Successfully!
                        }
                    });
                    // Sweet Alert Ends Here 
                }
            })
    }


    if (isLoading || enrollDataLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }

    return (
        <>
            <Helmet><title>User Dashboard - LingoVerse</title></Helmet>
            <h1 className='text-2xl md:text-3xl lg:text-4xl my-5 font-bold text-blue-900'>Hi! Welcome Back {user.displayName}!</h1>

            <div className='w-full lg:w-11/12 mx-auto p-2 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-5 mt-10'>
                {/* profile section  */}
                <div className='col-span-1 border-2 border-blue-800'>
                    <div className='p-2 space-y-1 overflow-x-hidden text-center'>
                        <img className='w-full' src={user?.photoURL} alt="" />
                        <h5 className='font-semibold text-pink-800 text-xl md:text-sm'>User Name: {user?.displayName}</h5>
                        <h5 className='font-semibold text-pink-800 text-xl md:text-xs'>Email: {user?.email}</h5>
                    </div>
                    <p className='lg:text-sm mt-1 hover:text-blue-600 mb-3 flex justify-center'><button className='hover:underline flex gap-0.5 items-center '>Update Profile <FaEdit></FaEdit></button></p>
                </div>
                {/* Registration Data Section  */}
                <div className='md:col-span-2 lg:col-span-3'>
                    <div className='flex justify-evenly flex-col md:flex-row items-center'>
                        <h3 className='text-2xl font-bold text-center text-pink-700 p-2'>Registration Data</h3>
                        <p className='lg:text-sm mt-1 hover:text-blue-600 mb-3 flex justify-center'><button onClick={() => setDisableForm(!disableForm)} className='hover:underline flex gap-0.5 items-center '>{disableForm ? <>Update Data <FaEdit></FaEdit></> : 'Back To Previous'}</button></p>
                    </div>
                    <div className='border-2 rounded-lg p-2'>
                        <form onSubmit={handleUpdateStudentRegisterData} className='space-y-2'>
                            <div>
                                <label className='font-semibold'>Full Name<span className='text-red-500'>*</span></label>
                                <input disabled={disableForm} defaultValue={registeredStudentData?.fullName} required type="text" name="name" id="name" placeholder='Enter Full Name' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Course Email<span className='text-red-500'>*</span></label>
                                <input disabled defaultValue={user?.email} type="email" name="email" id="email" placeholder='Enter your Email' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Nationality<span className='text-red-500'>*</span></label>
                                <input disabled={disableForm} defaultValue={registeredStudentData?.nationallity} required type="text" name="nationality" id="nationality" placeholder='Enter your nationality' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Passport Number<span className='text-red-500'>*</span></label>
                                <input disabled={disableForm} defaultValue={registeredStudentData?.passportNo} required type="text" name="passport" id="passport" placeholder='Enter Passport Number' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Phone<span className='text-red-500'>*</span></label>
                                <input disabled={disableForm} defaultValue={registeredStudentData?.phoneNo} required type="text" name="phone" id="phone" placeholder='Enter Your Phone' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Address<span className='text-red-500'>*</span></label>
                                <input disabled={disableForm} defaultValue={registeredStudentData?.address} required type="text" name="address" id="address" placeholder='Enter Your Address' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div className={`flex my-2 justify-center ${disableForm ? 'hidden' : 'block'}`}>
                                <button className='deafultButton'><input type="submit" value="Update" /></button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Enrolled Course Details  */}
                <div className='md:col-span-2 lg:col-span-3'>
                    <h3 className='text-2xl font-bold text-center text-blue-800 border-b-2 p-2'>Your Enrolled Courses</h3>
                    {
                        enrollData.length <= 0 && <div className='flex flex-col items-center justify-center h-full mb-4'>
                            <p className='font-semibold text-red-500'>Not Enrolled Any Classes Yet!</p>
                            <Link to='/courses'><button className='deafultButton my-3'>Enroll Now</button></Link>
                        </div>
                    }
                    {
                        [...enrollData].reverse().map(course => <EnrolledCourseCard key={course._id} enrollDetails={course}></EnrolledCourseCard>)
                    }
                </div>
            </div>
        </>
    );
};

export default UserHomepage;