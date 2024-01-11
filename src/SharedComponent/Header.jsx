import React, { useContext } from 'react';
import image from '../assets/logo/lingoVerselogo1.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

    const { user } = useContext(AuthContext);

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
                            <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/">Home</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/courses">Courses</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/mentors">Mentors</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/about">About Us</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/Login">Login</NavLink></li>

                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center">
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/">Home</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/courses">Courses</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/mentors">Mentors</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/about">About Us</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to="/Login">Login</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to=''><button className='deafultButton'>Enroll Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;