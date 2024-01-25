import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const StripePaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

    }


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
            <p className='text-center  mt-10'><button className='deafultButton w-1/5' type="submit" disabled={!stripe}>Pay</button></p>
        </form>
    );
};

export default StripePaymentPage;