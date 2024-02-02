import React, { useEffect, useState } from 'react';
import SectionTitle from '../../SharedComponent/SectionTitle';
import { Helmet } from 'react-helmet-async';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Puff } from 'react-loader-spinner';
import useMentors from '../../Hooks/useMentors';
import Swal from 'sweetalert2';

const ManageAllUsers = () => {
    const [showUserData, setShowUserData] = useState([]);
    const [showRegisteredStudent, setShowRegisteredStudent] = useState([]);
    const [showPermanentMentor, setShowPermanentMentor] = useState([]);
    const axiosSecuredCall = useAxiosSecureCall();
    const [searchQuery, setSearchQuery] = useState('');
    const { mentors, refetch, mentorLoading } = useMentors();

    // Get All Sign IN User 
    const { data: allUser = [], refetch: allUserRefetch, isLoading: allUserLoading } = useQuery({
        queryKey: ['allUser', searchQuery],
        queryFn: async () => {
            const response = await axiosSecuredCall.get(`/users?search=${searchQuery}`)
            return response.data;
        }
    });

    // Get All Registerd Students Data 
    const { data: allRegisteredStudents = [] } = useQuery({
        queryKey: ['allRegisteredStudents'],
        queryFn: async () => {
            const response = await axiosSecuredCall.get('/allRegister')
            return response.data;
        }
    })

    // Check Two Array Are Equeal 
    function arraysAreEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        if (!arraysAreEqual(allUser, showUserData)) {
            setShowUserData(allUser)
        }
    }, [allUser]);

    // Showing Selected Data 
    const handleSelectData = event => {
        const selectedData = event.target.value;

        if (selectedData === 'allUser') {
            setShowUserData(allUser);
            setShowRegisteredStudent([]);
            setShowPermanentMentor([]);
        }
        else if (selectedData === 'admin') {
            const adminOnly = allUser.filter(user => user.role === 'admin');
            setShowUserData(adminOnly);
            setShowRegisteredStudent([]);
            setShowPermanentMentor([]);
        }
        else if (selectedData === 'mentor') {
            const mentorOnly = allUser.filter(user => user.role === 'mentor');
            setShowUserData(mentorOnly);
            setShowRegisteredStudent([]);
            setShowPermanentMentor([]);
        }
        else if (selectedData === 'parmanentMentor') {
            setShowUserData([]);
            setShowRegisteredStudent([]);
            setShowPermanentMentor(mentors);
        }
        else if (selectedData === 'RegisteredStudent') {
            setShowUserData([]);
            setShowRegisteredStudent(allRegisteredStudents);
            setShowPermanentMentor([]);
        }
    };

    // Handle Search Query Function 
    const handleSearch = event => {
        setSearchQuery(event.target.value)
    };

    // Change User Role Here 
    const handleUpdateUserRole = async (id) => {
        const { value: role } = await Swal.fire({
            title: "Select User Role",
            input: "select",
            inputOptions: {
                admin: "Admin",
                mentor: "Mentor",
                user: "User"
            },
            inputPlaceholder: "Select a Role",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === "admin" || value === "mentor" || value === "user") {
                        resolve();
                    } else {
                        resolve("You need to select A Role!");
                    }
                });
            }
        });
        if (role) {
            axiosSecuredCall.patch(`/users/${id}`, { role })
                .then(res => {
                    if (res.data.modifiedCount) {
                        allUserRefetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User Role Changed!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }

    // Delete An User
    const handleDeleteUser = id => {
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
                axiosSecuredCall.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            allUserRefetch();
                        }
                    })
            }
        });
    }

    return (
        <>
            <Helmet><title>All Users - LingoVerse - Institute</title></Helmet>
            <SectionTitle subHeading={'Customize Users Role According Institution Rules'} heading={"Manage All Users"}></SectionTitle>
            <div className='w-full p-2 md:w-11/12 mx-auto my-5'>
                <div className='flex gap-4 justify-between items-center flex-col md:flex-row'>
                    <div className="join">
                        <input onChange={handleSearch} className="input input-bordered join-item" placeholder="Search All User By Email" />
                        <button className="btn join-item btn-primary">Search</button>
                    </div>
                    <div>
                        <label htmlFor="category" className='font-semibold'>Select Category</label>
                        <select onChange={handleSelectData} className="select select-primary w-full max-w-xs">
                            <option value='allUser'>All User</option>
                            <option value='mentor'>Mentors</option>
                            <option value='admin'>Admin</option>
                            <option value="parmanentMentor">Parmanent Mentor</option>
                            <option value="RegisteredStudent">Registered Students</option>
                        </select>
                    </div>
                </div>
                {
                    allUserLoading &&
                    <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
                }
                <div className="overflow-x-auto my-8">
                    {/* Showing User Whom Sign in the website  */}
                    {
                        showUserData.length > 0 &&
                        <table className="table">
                            <thead className='bg-blue-900 text-white text-[15px]'>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Change Role</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showUserData.map((user, i) =>
                                        <tr className='font-semibold' key={user._id}>
                                            <th>{i + 1}</th>
                                            <td>{user?.name}</td>
                                            <td>{user?.email}</td>
                                            <td>{user.role}</td>
                                            <td className='text-center'><button onClick={() => handleUpdateUserRole(user._id)} className='hover:bg-yellow-500 bg-opacity-30 p-3 rounded-full'><FaEdit className='hover:cursor-pointer'></FaEdit></button></td>
                                            <td className='text-center'><button onClick={() => handleDeleteUser(user._id)} className='hover:bg-red-500 bg-opacity-30 p-3 rounded-full'><FaTrashAlt></FaTrashAlt></button></td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    }
                    {/* Here Showing All Permanent Mentors  */}
                    {
                        showPermanentMentor.length > 0 &&
                        <table className="table">
                            <thead className='bg-blue-900 text-white text-[15px]'>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>image</th>
                                    <th>class Taken</th>
                                    <th>class</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showPermanentMentor.map((mentor, i) =>
                                        <tr className='font-semibold' key={mentor._id}>
                                            <th>{i + 1}</th>
                                            <td>{mentor?.name}</td>
                                            <td>{mentor?.email}</td>
                                            <td>Mentor</td>
                                            <td className='text-center'><img className='w-12' src={mentor?.image} alt="" /></td>
                                            <td className='text-center'>{mentor?.classes_taken}</td>
                                            <td>
                                                <ul>
                                                    {mentor && mentor.classes && mentor.classes.map((classItem, index) => (
                                                        <li key={index}>{classItem}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    }
                    {/* Showing Registered Student Data  */}
                    {
                        showRegisteredStudent.length > 0 &&
                        <table className="table">
                            <thead className='bg-blue-900 text-white text-[15px]'>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Nationality</th>
                                    <th>Passport</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showRegisteredStudent &&
                                    showRegisteredStudent.map((student, i) =>
                                        <tr className='font-semibold' key={student._id}>
                                            <th>{i + 1}</th>
                                            <td>{student?.fullName}</td>
                                            <td>{student?.email}</td>
                                            <td>{student?.nationallity}</td>
                                            <td>{student?.passportNo}</td>
                                            <td>{student?.phoneNo}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default ManageAllUsers;