import React from 'react';
import SectionTitle from '../../SharedComponent/SectionTitle';
import StripePaymentPage from './StripePaymentPage';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import visa from '../../assets/icons/visa.png';
import mastercard from '../../assets/icons/card.png';
import union from '../../assets/icons/unionpay.png';
import aex from '../../assets/icons/american-express.png';
import diner from '../../assets/icons/diners-club.png';
import discover from '../../assets/icons/discover.png';
import bkash from '../../assets/icons/bkash.png';
import nagad from '../../assets/icons/nagad.png';
import roket from '../../assets/icons/rocket.png';

const PaymentPage = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT);

    return (
        <>
            <SectionTitle heading={"Payment"} subHeading={"Select Your Desire Payment Method And Get Enrolled"}></SectionTitle>
            <div className='w-full p-3 md:w-3/5 lg:w-2/5 mx-auto border-2 border-blue-500 rounded-lg'>
                <h3 className='font-semibold text-center mb-4'>Pay With Bank Card</h3>
                <Elements stripe={stripePromise}>
                    <StripePaymentPage></StripePaymentPage>
                </Elements>
                <div className='flex items-center flex-col md:flex-row mt-6 md:mt-0 gap-2 md:gap-4 justify-center'>
                    <h3 className='font-medium'>We Accept </h3>
                    <div className='flex justify-evenly gap-3 my-5'>
                        <img className='w-8' src={visa} alt="" />
                        <img className='w-8' src={mastercard} alt="" />
                        <img className='w-8' src={union} alt="" />
                        <img className='w-8' src={aex} alt="" />
                        <img className='w-8' src={diner} alt="" />
                        <img className='w-8' src={discover} alt="" />
                    </div>
                </div>
                <div className="divider">OR</div>
                <div>
                    <p className='font-medium'>Continue With</p>
                    <div className='flex items-center gap-2 md:gap-5 justify-evenly'>
                        <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150 w-20' src={bkash} alt="" />
                        <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150  w-20' src={nagad} alt="" />
                        <img className='p-3 shadow-lg cursor-pointer hover:scale-105 rounded-md transition duration-150  w-20' src={roket} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;