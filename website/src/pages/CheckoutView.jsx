import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

/*

Mga need ilagay:
* Import mga constants from products
* Input fields for payment, delivery info., etc.
* Order button na magredirect sa SuccessView.jsx

*/

function CheckoutView() 
{
    return (
        <main className="w-full h-full flex flex-col justify-center items-center">       
            <text className="font-bold text-[28px]">Checkout</text>
            <p>Items</p> {/* Will place constants here */}
            <p>Payment</p> {/* Will place constants here */}
            <p>Delivery info</p> {/* Will place constants here */}
            <a href="/success" className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-30 rounded-full inline-block" 
            style={{ minWidth: '300px', textAlign: 'center' }}> Order </a>
        </main>
    )
}

export default CheckoutView;

