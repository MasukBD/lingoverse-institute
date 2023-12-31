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
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;