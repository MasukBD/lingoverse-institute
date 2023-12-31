import React from 'react';

const Footer = () => {
    return (
        <div className="bg-[url('/footer.svg')]">
            <footer className="footer p-10 text-white">
                <nav>
                    <header className="footer-title">Teachings</header>
                    <a className="link link-hover">Summer Courses</a>
                    <a className="link link-hover">Diploma Certificate</a>
                    <a className="link link-hover">Huge Comunity</a>
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
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form>
                    <header className="footer-title">Newsletter</header>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="text-white">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input required type="text" placeholder="jonhFk@mail.com" className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
            <hr className='mx-10 text-white' />
            <p className='text-white text-center font-semibold pt-2'>© All Right Reserved To LingoVerse! MD ILIUS MAHFUZ 2023</p>
        </div>
    );
};

export default Footer;