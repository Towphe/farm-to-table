import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useLocation} from 'react-router-dom';
import { DateTime } from "luxon";


function OrderSuccess(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get("oid");
    const currentDateTime = DateTime.now();

    return (
        <main className="w-full h-full flex flex-col justify-center items-center space-y-5">
            <h1 className="font-bold text-[28px]">Order success!</h1>
            <p>Thank you for shopping with us!</p>
            <p className="text-[14px]">Order #{transactionId} {currentDateTime.monthShort}/{currentDateTime.day}/{currentDateTime.year} {currentDateTime.hour}:{currentDateTime.minute}</p>
            <Link to="/" className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-20 rounded-full"> Go back </Link>
        </main>
    )
}

export default OrderSuccess;