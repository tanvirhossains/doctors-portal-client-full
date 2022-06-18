import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L9TZPLZgxV5Swf8Ue0zuTrCu5ZSZvTRpJye0FIo9T95eeePvBS0BJQ0pELKfAdT7w7eLKTkm7YMp3D24NEFqeWJ00nPa4DPkj');


const Payment = () => {
    const { appointId } = useParams()

    const uri = `http://localhost:5000/booking/${appointId}`
    const { data: appointment, isLoading } = useQuery(['booking', appointId], () => fetch(uri, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res =>
        res.json()
    )
    )


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            <div class="card w-1/2 my-12 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h1 className='text-green-600 text-2xl'>Hello, {appointment.patientName}</h1>
                    <h2 class="card-title"> Par for {appointment.treatment} !</h2>
                    <p>Your appointment for  <span className='text-red-500 text-2xl'>  {appointment.date}</span> at {appointment.slot} </p>
                    <h1>Please Pay : ${appointment.price}</h1>
                </div>
            </div>
            <div class="card  shadow-2xl bg-base-100">
                <div class="card-body">

                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;