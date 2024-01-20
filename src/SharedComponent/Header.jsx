import React, { useContext } from 'react';
import image from '../assets/logo/lingoVerselogo1.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Log out Successfull!')
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<p>${error.message}</p>`
                });
            })
    };

    const commonNavitem = <>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/courses">Courses</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/mentors">Mentors</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/about">About Us</NavLink></li>
    </>

    return (
        <div className='bg-gradient-to-r from-[#000000] to-[#2c29d4] sticky z-10 top-0'>
            <div className="navbar px-2 md:w-11/12 mx-auto">
                <div className='navbar-start'>
                    <Link to='/'><img className='w-1/2 lg:w-2/5' src={image} alt="" /></Link>
                </div>
                <div className="navbar-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="bg-blue-500 bg-opacity-80 dropdown-content mt-3 z-10 p-2 rounded-md w-40 text-white">
                            {commonNavitem}
                            {
                                user && <>
                                    <li title={user?.displayName}>{user.photoURL ? <img className='w-12 p-2 rounded-full' src={user?.photoURL} alt="" /> : <FaUserCircle className='text-3xl'></FaUserCircle>}</li>
                                    <li className='default'><Link to={'/dashboard/UserHome'}>Dashboard</Link></li>
                                </>
                            }
                            {
                                user ?
                                    <li className='default'><button onClick={handleLogout} className='flex gap-0.5 items-center'><FaSignInAlt></FaSignInAlt> <span className='font-semibold'>Log&nbsp;Out</span></button></li>
                                    :
                                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/Login">Login</NavLink></li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center">
                        {commonNavitem}
                        {
                            user ?
                                <li className='px-2 dropdown'>
                                    {
                                        <label className='cursor-pointer' tabIndex={0} title={user.displayName}>{user?.photoURL ? <img className='rounded-full w-10' src={user?.photoURL} alt="display Photo" /> : <FaUserCircle className="text-3xl"></FaUserCircle>}</label>
                                    }
                                    <ul className="bg-blue-600 mt-4 bg-opacity-80 dropdown-content p-2 z-10 shadow rounded">
                                        <li className='default'><Link to={'/dashboard/UserHome'}>Dashboard</Link></li>
                                        <li className='default'><button onClick={handleLogout} className='flex gap-0.5 items-center'><FaSignInAlt></FaSignInAlt> Log&nbsp;Out</button></li>
                                    </ul>
                                </li>
                                :
                                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/Login">Login</NavLink></li>
                        }

                    </ul>
                </div>
                <div className="navbar-end">
                    <HashLink smooth to='/#courses'><button className='deafultButton'>Enroll Now</button></HashLink>
                </div>
            </div>
        </div>
    );
};

export default Header;