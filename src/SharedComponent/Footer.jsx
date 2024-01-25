import React from 'react';
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";

const Footer = () => {
    return (
        <div className="bg-[url('/footer.svg')]">
            <footer className="footer p-10 text-white">
                <nav>
                    <header className="footer-title">Teachings</header>
                    <a className="link link-hover">Summer Courses</a>
                    <a className="link link-hover">Diploma Certificate</a>
                    <a className="link link-hover">Comunity</a>
                    <a className="link link-hover">Active Platform</a>
                </nav>
                <nav>
                    <header className="footer-title">Organizations</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Contact Us</header>
                    <p className='flex gap-1 items-center'><HiLocationMarker></HiLocationMarker> 123 Kazi Nazrul Ave, Agargaon, Dhaka</p>
                    <p className='flex gap-1 items-center'><HiPhone></HiPhone> Phone: +8801272028183</p>
                    <p className='flex gap-1 items-center'><HiMail></HiMail> Email: support@lingoverse.com</p>
                </nav>
                <form>
                    <header className="footer-title">Newsletter</header>
                    <fieldset className="form-control">
                        <label className="label">
                            <span className="text-white">Enter your email address</span>
                        </label>
                        <div>
                            <input required type="text" placeholder="jonhFk@mail.com" className="input input-bordered" /><br />
                            <button className="deafultButton mt-3">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
            <hr className='md:mx-10 text-white' />
            <p className='text-white text-center font-semibold p-2'>© All Right Reserved To LingoVerse! MD ILIUS MAHFUZ 2023</p>
        </div>
    );
};

export default Footer;