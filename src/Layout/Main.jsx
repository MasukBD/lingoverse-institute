import React from 'react';
import Header from '../SharedComponent/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../SharedComponent/Footer';
import ScrollToTop from '../SharedComponent/ScrollToTop';

const Main = () => {
    return (
        <>
            <ScrollToTop></ScrollToTop>
            <Header></Header>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Main;