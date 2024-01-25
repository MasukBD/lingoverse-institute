import React, { useContext, useState } from 'react';
import useCourses from '../../Hooks/useCourses';
import { Puff } from 'react-loader-spinner';
import CourseDetailsCard from '../../SharedComponent/CourseDetailsCard';
import { Helmet } from 'react-helmet-async';
import bgPhoto from '../../assets/campus/allCoursebg.png';
import SectionCover from '../../SharedComponent/SectionCover';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown } from 'react-country-region-selector';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import Swal from 'sweetalert2';
import useGetRegisteredStudent from '../../Hooks/useGetRegisteredStudent';


const Courses = () => {
    const { courses, loading } = useCourses();
    const sortedCourses = courses.sort((a, b) => b.available_seats - a.available_seats);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState();
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const axiosSecuredCall = useAxiosSecureCall();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [registeredStudentData] = useGetRegisteredStudent();

    // SweetAlert Variable 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleEnrollment = course => {
        if (!user) {
            return navigate('/login', { state: { from: location } })
        }
        else if (!registeredStudentData) {
            setSelectedCourse(course);
            document.getElementById('register_modal').showModal();
            return;
        }
        axiosSecuredCall.post('/courseCart', { courseName: course.course_name, courseId: course._id, courseFees: course.course_fee, mentor: course.mentor_name, studentEmail: registeredStudentData.email, phone: registeredStudentData.phoneNo })
            .then(res => {
                if (res.data.insertedId) {
                    Toast.fire({
                        icon: "success",
                        title: "Course Added Cart!"
                    });
                    navigate('/dashboard/cartItem');
                }
            })
    }

    const handleStudentRegistration = event => {
        if (!country) {
            event.preventDefault();
            setError('Please Select A Country!');
            return;
        }
        else if (!isPossiblePhoneNumber(String(value))) {
            event.preventDefault();
            setError('Phone Number is Required!');
            return;
        }
        const form = event.target;
        const fullName = form.name.value;
        const email = form.email.value;
        const passport = form.passport.value;
        const address = form.address.value;
        const registrationData = { fullName, email, nationallity: country, passportNo: passport, phoneNo: value, address };
        axiosSecuredCall.post('/register', registrationData)
            .then(res => {
                if (res.data.insertedId) {
                    setError('');
                    axiosSecuredCall.post('/courseCart', { courseName: selectedCourse.course_name, courseId: selectedCourse._id, courseFees: selectedCourse.course_fee, mentor: selectedCourse.mentor_name, studentEmail: email, phone: value })
                        .then(data => {
                            if (data.data.insertedId) {
                                Toast.fire({
                                    icon: "success",
                                    title: "Course Added Cart!"
                                });
                                navigate('/dashboard/cartItem');
                            }
                        })
                }
            })

    }

    if (loading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    return (
        <>
            <Helmet><title>Courses - LingoVerse - Institute</title></Helmet>
            <SectionCover heading={'All COURSES'} subHeading={'Embark on a linguistic adventure with us and open doors to new connections, travel experiences, and personal growth. Join our multicultural community of learners and start your language learning journey today!'} image={bgPhoto}></SectionCover>
            <div className='w-full md:w-11/12 mx-auto p-2'>
                <p className='flex items-center font-semibold mb-4'><span className='p-1.5 rounded-md text-white bg-red-500'>Notice</span> <marquee><span className='text-red-500'>March Intake 2024 Enrollment is going Now! Deadline for Registration is 23<sup>rd</sup> February. Thank You!</span></marquee></p>
                {
                    sortedCourses.map(course => <CourseDetailsCard course={course} key={course._id} handleEnrollButton={handleEnrollment}></CourseDetailsCard>)
                }
            </div>
            <dialog id="register_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-center text-2xl text-blue-700">Complete Profile!</h3>
                    <p className="py-1 text-center">This Info will be Recorded as your Course Registration Data!</p>
                    <div className="modal-action">
                        <form onSubmit={handleStudentRegistration} className='w-full p-2 space-y-2' method="dialog">
                            <div>
                                <label className='font-semibold'>Full Name<span className='text-red-500'>*</span></label>
                                <input required type="text" name="name" id="name" placeholder='Enter Full Name' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Course Email<span className='text-red-500'>*</span></label>
                                <input readOnly required defaultValue={user?.email} type="email" name="email" id="email" placeholder='Enter your Email' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <label className='font-semibold'>Phone <span className='text-red-500'>*</span></label><br />
                                <PhoneInput
                                    international
                                    defaultCountry="BD"
                                    value={value}
                                    limitMaxLength
                                    className='phoneInput'
                                    onChange={setValue} />
                            </div>
                            {
                                error && <span className='text-red-500 font-semibold text-sm'>{error}</span>
                            }
                            <div className='flex flex-col gap-5 md:flex-row'>
                                <div className='w-full md:w-1/2'>
                                    <label className='font-semibold'>Nationality <span className='text-red-500'>*</span></label>
                                    <CountryDropdown
                                        value={country}
                                        onChange={(val) => setCountry(val)}
                                        style={{ width: '100%', padding: '8px', border: '2px solid #e5e7eb', borderRadius: '6px' }} />
                                </div>
                                <div>
                                    <label className='font-semibold'>Passport/Nid No. <span className='text-red-500'>*</span></label>
                                    <input required type="text" name="passport" id="passport" placeholder='Passport/Nid Number' className='p-2 w-full border-2 rounded-lg' />
                                </div>
                            </div>
                            <div>
                                <label className='font-semibold'>Address <span className='text-red-500'>*</span></label>
                                <input required type="text" name="address" id="address" placeholder='Present Address' className='p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className='mt-3'><input className='deafultButton' type="submit" value="Proceed" /></button>
                            </div>
                        </form>
                    </div>
                    <p className='text-xs mt-2 hidden md:block text-gray-400 text-center'>Press Esc to close the Modal!</p>
                </div>
            </dialog>
        </>
    );
};

export default Courses;