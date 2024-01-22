import React, { useContext, useState } from 'react';
import ParitclesJs from '../Particles/ParitclesJs';
import { Helmet } from 'react-helmet-async';
import facebookImage from '../../assets/icons/facebook.png';
import googleImage from '../../assets/icons/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosCall from '../../Hooks/useAxiosCall';

const Login = () => {
    const [error, setError] = useState('');
    const [showSocial, setShowSocial] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosCall = useAxiosCall();
    const { googleLogIn, facebookLogIn, loginWithEmailPassword, passwordReset } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";


    const onSubmit = async (data) => {
        loginWithEmailPassword(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                toast.success(`${loggedUser.displayName} login successfully!`)
                setError('');
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message);
            })
    };

    const handleForgetPassword = async () => {
        const { value: email } = await Swal.fire({
            title: "Input valid email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
        });
        if (email) {
            passwordReset(email)
                .then(() => {
                    Swal.fire({
                        title: "Passowd Reset Email Sent!",
                        text: `Check ${email}`,
                        icon: "success"
                    });
                    setError('');
                })
                .catch(error => {
                    setError(error.message);
                })
        }
    };

    const handleGoogleLogin = () => {
        googleLogIn()
            .then(result => {
                const loggedUser = result.user;
                const user = { name: loggedUser?.displayName, email: loggedUser.email, role: 'user' };
                toast.success(`${loggedUser?.displayName} Sign in Successfull!`);
                setError('');
                navigate(from, { replace: true });
                axiosCall.post('/users', user)
                    .then(() => {
                        // if the user sign in before with same account then this http call will not response
                    })
            })
            .catch(error => {
                setError(error.message)
            })
    };

    const handleFacebookLogin = () => {
        facebookLogIn()
            .then(result => {
                const loggedUser = result.user;
                toast.success(`${loggedUser.displayName} Sign in Successfull!`);
                setError('');
                navigate(from, { replace: true });
                const user = { name: loggedUser?.displayName, email: loggedUser.email, role: 'user' };
                axiosCall.post('/users', user)
                    .then(() => {
                        // if the user sign in before with same account then this http call will not response
                    })
            })
            .catch(error => {
                setError(error.code);
            })
    };

    return (
        <>
            <ParitclesJs></ParitclesJs>
            <Helmet><title>Login - LingoVerse - Institute</title></Helmet>
            <div className='w-full md:w-6/12 lg:w-5/12 mx-auto p-2 flex flex-col justify-center items-center min-h-screen'>
                {
                    showSocial ?
                        <>
                            <h1 className='text-center text-3xl font-semibold my-10'>Log in</h1>
                            <div className='space-y-3'>
                                <button onClick={handleGoogleLogin} className='flex items-center gap-1 p-1.5 border-2 rounded-lg pr-2 hover:bg-black hover:text-white'><img width={40} src={googleImage} alt="" /> <span className='font-semibold text-lg'>Continue With Google</span></button>
                                <button onClick={handleFacebookLogin} className='flex items-center gap-1 p-1.5 border-2 rounded-lg pr-2 hover:bg-black hover:text-white'><img width={40} src={facebookImage} alt="" /> <span className='font-semibold text-md'>Continue With Facebook</span></button>
                            </div>
                            <button onClick={() => setShowSocial(false)} className='my-10 font-semibold text-blue-600 hover:underline'>Login with Email/Password</button>
                        </>
                        :
                        <>
                            <h1 className='text-center text-2xl font-semibold my-10'>Log in to LingoVerse</h1>
                            <div className='mb-10 w-full rounded-lg bg-blue-200 p-3'>
                                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                                    <div>
                                        <label className='font-semibold'>Email</label><br />
                                        <input {...register("email", { required: true })} placeholder='Enter Your Email' className='w-full border p-2 rounded-md' type="email" id="email" />
                                        {errors.email?.type === 'required' && <span className='text-sm text-red-500'>This field is required!</span>}
                                    </div>
                                    <div>
                                        <label className='font-semibold'>Password</label><br />
                                        <input {...register("password", { required: true })} placeholder='Enter Your Password' className='w-full border p-2 rounded-md' type="password" id="password" />
                                        {errors.password?.type === 'required' && <span className='text-sm text-red-500 py-0.5'>This field is required!</span>}
                                        <br />
                                        <span onClick={handleForgetPassword} className='text-xs font-semibold hover:underline cursor-pointer my-0.5'>Forget Password?</span>
                                    </div>
                                    <div>
                                        <button className='my-3 w-full'><input className='p-2 w-full hover:bg-[#252958] bg-blue-700 text-white font-semibold' type="submit" value="Login" /></button>
                                    </div>
                                </form>
                            </div>
                        </>
                }
                {
                    error && <p className='my-2 text-center font-semibold text-red-500'>{error}</p>
                }
                <p className='font-semibold mb-16'>No Account Yet? <Link to='/register'><button className='text-blue-600 underline'>Register</button></Link></p>
                <p className='text-base-400 mt-10 lg:mt-12 text-center'>By logging in to LingoVerse, you agree to our <Link><span className='text-blue-400 underline'>terms & Conditions</span></Link></p>
            </div>
        </>
    );
};

export default Login;