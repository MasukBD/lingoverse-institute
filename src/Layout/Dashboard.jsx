import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/lingoVerselogo1.png';
import { Link } from 'react-router-dom';
import { HiAcademicCap, HiBookOpen, HiHome, HiLogout, HiUsers } from "react-icons/hi";
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Footer from '../SharedComponent/Footer';
import { NavLink } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import ScrollToTop from '../SharedComponent/ScrollToTop';
import useUserRole from '../Hooks/useUserRole';
import { Puff } from 'react-loader-spinner';

const Dashboard = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userRole, userRoleLoading } = useUserRole();
    let navItem;


    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfull!');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const logOutButton = <li><button onClick={handleLogout} className='default flex gap-1 items-center'><HiLogout></HiLogout> LogOut</button></li>

    if (userRole === 'admin') {
        navItem = <>
            <li><NavLink to="/dashboard/manageCourses" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome />Admin Home</NavLink></li>
            <li><NavLink to="/dashboard/manageUsers" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiUsers /> All Users</NavLink></li>
            {logOutButton}
        </>
    } else if (userRole === 'mentor') {
        navItem = <>
            <li><NavLink to="/dashboard/mentorHome" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome /> Mentor Home</NavLink></li>
            <li><NavLink to="/dashboard/myClasses" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiBookOpen /> My Classes</NavLink></li>
            <li><NavLink to="/dashboard/addAClass" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiAcademicCap /> Add&nbsp;A&nbsp;Class</NavLink></li>
            {logOutButton}
        </>
    }
    else {
        navItem = <>
            <li><NavLink to="/dashboard/userHome" className={({ isActive }) => (isActive ? 'active' : 'default')}><HiHome /> User Home</NavLink></li>
            <li><NavLink to="/dashboard/cartItem" className={({ isActive }) => (isActive ? 'active' : 'default')}><FaCartArrowDown /> Courses Cart</NavLink></li>
            {logOutButton}
        </>
    }

    if (userRoleLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content overflow-x-auto">
                {/* Navbar */}
                <div className="w-full navbar text-white bg-gradient-to-r from-[#000000] to-[#0e0c74] flex justify-between px-6 md:px-14">
                    <div className=""><Link to='/'><img className='w-1/2 lg:w-2/5' src={logo} alt="" /></Link></div>
                    <div className="lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex gap-3">
                            {/* Navbar menu content here */}
                            {navItem}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className='w-full p-2 min-h-screen md:w-11/12 mx-auto'>
                    <ScrollToTop></ScrollToTop>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu px-4 pt-16 w-48 min-h-full text-white bg-blue-950">
                    {/* Sidebar content here */}
                    {navItem}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;