import React from 'react';
import useCart from '../../Hooks/useCart';
import SectionTitle from '../../SharedComponent/SectionTitle';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import Swal from 'sweetalert2';


const SelectedCourse = () => {
    const [cart, refetch, cartLoading] = useCart();
    const axiosSecuredCall = useAxiosSecureCall();

    const handleCartItemDelete = id => {
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
                axiosSecuredCall.delete(`/courseCart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Selected Course has been deleted!",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    return (
        <>
            <SectionTitle heading={'Your Selected Classes'} subHeading={'Just One Step Furture'}></SectionTitle>
            {
                cartLoading && <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
            }
            {
                cart.length > 0 ?
                    <div className='overflow-x-auto mt-10 mb-5 w-full p-3 md:w-11/12 mx-auto'>
                        <table className="table">
                            {/* head */}
                            <thead className='bg-blue-800 text-white p-2'>
                                <tr className='text-[15px]'>
                                    <th>Serial No.</th>
                                    <th>Course Name</th>
                                    <th>Tution Fees</th>
                                    <th>Instructor</th>
                                    <th>Action</th>
                                    <th>Complete Procudure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, i) => <tr key={item._id} className=" font-bold py-1 text-black">
                                        <th>{i + 1}</th>
                                        <td className='hover:underline hover:text-blue-500'><HashLink to={`/courses#${item.courseId}`}>{item.courseName}</HashLink></td>
                                        <td>$ <span className='text-pink-600'>{item.courseFees}</span></td>
                                        <td className='hover:underline hover:text-blue-500'><HashLink to={`/mentors#${item.mentor}`}>{item.mentor}</HashLink></td>
                                        <td title='Delete'><button onClick={() => handleCartItemDelete(item._id)}><FaTrashAlt className='text-5xl hover:bg-red-500 bg-opacity-60 p-3 hover:rounded-full hover:text-white'></FaTrashAlt></button></td>
                                        <td className='text-center'><Link to='/dashboard/payment'><button className='deafultButton'>Pay</button></Link></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='flex items-center justify-center flex-col gap-5 mt-20'>
                        <p className='text-center font-semibold text-red-500 text-2xl'>No Course Selected Yet!</p>
                        <Link to='/courses'><button className='deafultButton'>Select A Class</button></Link>
                    </div>
            }
        </>
    );
};

export default SelectedCourse;