import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ParitclesJs from '../Particles/ParitclesJs';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthProvider';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosCall from '../../Hooks/useAxiosCall';


const SignUp = () => {
    const [manualError, setManualError] = useState('');
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { creatingUserWithEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosCall = useAxiosCall();

    // Toggle show and hide password 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const dispalyPhoto = data.photoUrl;
        const userToDb = { name: data.name ? data.name : 'Anonymous', email: email, role: 'user' };
        creatingUserWithEmail(email, password)
            .then(result => {
                const newUser = result.user;
                updateProfile(newUser, { displayName: data.name ? data.name : 'Anonymous', photoURL: dispalyPhoto && dispalyPhoto })
                axiosCall.post('/users', userToDb)
                    .then(res => {
                        if (res.data.insertedId) {
                            sendEmailVerification(newUser)
                                .then(() => {
                                    Swal.fire({
                                        title: "Sign Up Completed!",
                                        text: "A Verification Email sent to your Email!",
                                        icon: "success"
                                    });
                                    reset();
                                    setManualError('');
                                    navigate('/');
                                })
                                .catch(error => {
                                    setManualError(error.message);
                                })
                        }
                    })
                    .catch(error => {
                        setManualError(error.message);
                    })
            })
            .catch(error => {
                setManualError(error.message);
            })
    }

    return (
        <>
            <ParitclesJs></ParitclesJs>
            <Helmet><title>Sign Up - LingoVerse - Institute</title></Helmet>
            <div className='w-full md:w-6/12 lg:w-5/12 mx-auto p-2 flex flex-col justify-center items-center min-h-screen'>
                <h1 className='text-center text-2xl font-semibold my-10'>Sign Up</h1>
                <div className='mb-10 w-full rounded-lg bg-blue-200 p-3'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                        <div>
                            <label className='font-semibold'>User Name</label><br />
                            <input {...register("name", { maxLength: 40 })} placeholder='Enter Your name' className='w-full border p-2 rounded-md' type="text" id="name" />
                            {errors.name?.type === 'maxLength' && <span className='text-sm text-red-500'>Name character exceeds limit!</span>}
                        </div>
                        <div>
                            <label className='font-semibold'>Email <span className='text-red-500'>*</span></label><br />
                            <input {...register("email", { required: true })} placeholder='Enter Your Email' className='w-full border p-2 rounded-md' type="email" id="email" />
                            {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        </div>
                        <div className='relative'>
                            <label className='font-semibold'>Password <span className='text-red-500'>*</span></label><br />
                            <input {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, maxLength: 16 })} placeholder='Enter Your Password' className='w-full border p-2 rounded-md pr-10' type={showPassword ? "text" : "password"} id="password" />
                            <span className="absolute top-2/3 transform -translate-y-1/2 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                            </span>
                        </div>
                        {/* Password Validation Messages  */}
                        {errors.password?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                        {errors.password?.type === 'minLength' && <span className='text-sm text-red-500'>Password Should be at least 6 character!</span>}
                        {errors.password?.type === 'maxLength' && <span className='text-sm text-red-500'>Password could be max 16 character!</span>}
                        {errors.password?.type === 'pattern' && <span className='text-sm text-red-500'>Password Should include at least one small,one capital latter, one number and one special'@#$!&*' .</span>}
                        <div className='relative'>
                            <label className='font-semibold'>Confirm Password <span className='text-red-500'>*</span></label><br />
                            <input
                                {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })}
                                placeholder='Confirm Your Password'
                                className='w-full border p-2 rounded-md'
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                            />
                            <span className='absolute right-4 cursor-pointer transform top-2/3 -translate-y-1/2' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                            </span>
                        </div>
                        {/* Display password match error */}
                        {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                            <span className='text-xs text-red-500'>Passwords do not match</span>
                        )}
                        <div>
                            <label className='font-semibold'>Photo URL <span>*</span></label>
                            <br />
                            <input type="url" {...register('photoUrl')} className='w-full p-2 rounded-md border' placeholder='Enter Photo URL' id="photo" />
                        </div>
                        <div>
                            <button className='my-3 w-full'><input className='p-2 w-full hover:bg-[#252958] bg-blue-700 text-white font-semibold' type="submit" value="Sign Up" /></button>
                        </div>
                    </form>
                </div>
                {
                    manualError && <p className='my-2 text-center font-semibold text-red-500'>{manualError}</p>
                }
                <p className='font-semibold mb-16'>Already have an Account? <Link to='/login'><button className='text-blue-600 underline'>Login</button></Link></p>
                <p className='text-base-400 mt-10 lg:mt-12 text-center'>By signingUp in to LingoVerse, you agree to our <Link><span className='text-blue-400 underline'>terms & Conditions</span></Link></p>
            </div>
        </>
    );
};

export default SignUp;