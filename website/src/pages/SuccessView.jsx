import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';


function OrderSuccess()
{
    const [orderId, setOrderId] = useState('');
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => 
    {
        // Fetch orderId and orderDate from the server when component mounts
        axios.post('http://localhost:3000/api/order/confirm-order')
            .then(response =>
            {
                const { orderId, createdAt } = response.data;
                setOrderId(orderId);
                setOrderDate(createdAt);
            })
            .catch(error => 
            {
                console.error('Error fetching order:', error);
            });
    }, []);

    return (
        <main className="w-full h-full flex flex-col justify-center items-center space-y-5">
            <text className="font-bold text-[28px]">Order success!</text>
            <p>Thank you for shopping with us!</p>
            <p className="text-[14px]">Order #{orderId} {orderDate}</p>
            <Link to="/" className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-20 rounded-full"> Go back </Link>
        </main>
    )
}

export default OrderSuccess;