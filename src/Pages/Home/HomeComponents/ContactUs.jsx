import React, { useContext, useState } from 'react';
import SectionTitle from '../../../SharedComponent/SectionTitle';
import { AuthContext } from '../../../Provider/AuthProvider';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import '../HomeComponents/styles/style.css';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import toast from 'react-hot-toast';
import useAxiosCall from '../../../Hooks/useAxiosCall';

const ContactUs = () => {
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const [value, setValue] = useState();
    const axiosCall = useAxiosCall();

    const handleMessageSubmit = event => {
        event.preventDefault();
        const from = event.target;
        if (!isPossiblePhoneNumber(String(value))) {
            setError('Phone Number is Required!')
            return;
        }
        const name = from.name.value;
        const email = from.email.value;
        const texts = from.message.value;
        const message = { name, email, phone: value, messageText: texts };
        axiosCall.post('/messages', message)
            .then(data => {
                if (data.data.insertedId) {
                    from.reset();
                    toast.success('Thanks for your feedback!');
                    setError('');
                }
            })
    }

    return (
        <div className='w-full md:w-11/12 mx-auto p-2 my-9'>
            <SectionTitle heading={"KEEP IN TOUCH"} subHeading={'Feel free contact with us'}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                <div className='bg-blue-100 p-2 rounded-md'>
                    <h2 className='text-center text-2xl my-3 font-semibold'>Send Message</h2>
                    <form onSubmit={handleMessageSubmit} className='space-y-3'>
                        <div>
                            <label className='font-semibold'>Name <span className='text-red-500'>*</span></label><br />
                            <input className='p-2 rounded-md w-full' required placeholder='Your Name' defaultValue={user && user.displayName} type="text" name="name" id="name" />
                        </div>
                        <div>
                            <label className='font-semibold'>Email <span className='text-red-500'>*</span></label><br />
                            <input className='p-2 rounded-md w-full' required placeholder='Your Email' defaultValue={user && user.email} type="email" name="email" id="email" />
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
                            error && <p className='text-xs text-red-500 font-semibold'>{error}</p>
                        }
                        <div>
                            <label className='font-semibold'>Message <span className='text-red-500'>*</span></label><br />
                            <textarea className='w-full p-2' required name="message" id="message" cols="30" rows="5"></textarea>
                        </div>
                        <div>
                            <button className='my-3 w-full'><input className='p-2 w-full hover:bg-[#252958] bg-blue-700 text-white font-semibold' type="submit" value="Send" /></button>
                        </div>
                    </form>
                </div>
                <div>
                    <h2 className='text-center text-2xl mb-3 text-blue-700 font-semibold'>Locate Us On Maps</h2>
                    <iframe className='w-full border-0 rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9506608565557!2d90.39092137439155!3d23.74913878882661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c75f7c6295ed%3A0xdab7527bd7ffe96c!2sKazi%20Nazrul%20Islam%20Ave%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1705333720688!5m2!1sen!2sbd" allowFullScreen="" style={{ height: '91.5%' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;