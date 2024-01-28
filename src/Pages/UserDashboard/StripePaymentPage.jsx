import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecureCall from '../../Hooks/useAxiosSecureCall';
import { AuthContext } from '../../Provider/AuthProvider';
import useGetRegisteredStudent from '../../Hooks/useGetRegisteredStudent';
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const StripePaymentPage = ({ cartDetails }) => {
    const { user } = useContext(AuthContext);
    const [registeredStudentData] = useGetRegisteredStudent();
    const stripe = useStripe();
    const elements = useElements();
    const [showError, setShowError] = useState('');
    const { cartId, courseId, price, course, mentor } = cartDetails;
    const axiosSecuredCall = useAxiosSecureCall();
    const [clientSecret, setClientSecret] = useState('');
    const [laoder, setLoader] = useState(false);
    const navigate = useNavigate();


    // SweetAlert Message 
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

    useEffect(() => {
        axiosSecuredCall.post('/create-stripe-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [cartDetails])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setShowError(error.message);
            return;
        } else {
            setShowError('');
        }
        setLoader(true);
        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });
        if (confirmationError) {
            setShowError(confirmationError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            setLoader(false);
            setShowError('');
            const enrollmentData = {
                date: moment().format('LLLL'),
                studentId: Math.floor(Math.random() * 1000000),
                name: registeredStudentData.fullName,
                email: user?.email,
                courseEnrolled: course,
                mentor: mentor,
                courseId: courseId,
                cartId: cartId,
                paymentStatus: 'Paid',
                trnxId: paymentIntent.id,
            }
            axiosSecuredCall.post('/enrolledStudents', enrollmentData)
                .then(res => {
                    if (res.data.insertEnrollment.insertedId) {
                        Toast.fire({
                            icon: "success",
                            title: "Enrolled successfully!"
                        });
                        navigate('/dashboard/userHome');
                    }
                })
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#1f1c8a',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {
                showError && <p className='font-semibold text-red-500 my-1'>{showError}</p>
            }
            <p className='text-center mt-7'><button className='deafultButton w-1/3 md:w-1/5' type="submit" disabled={!stripe || !clientSecret || laoder}>{laoder ? 'Processing.' : 'Pay'}</button></p>
        </form>
    );
};

export default StripePaymentPage;