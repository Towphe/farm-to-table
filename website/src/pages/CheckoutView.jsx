import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function CheckoutView() 
{
    const items = 
    [
        {id: 12000, name: 'Jaco', price: 100},
        {id: 11330, name: 'Jaco', price: 100},
        {id: 21330, name: 'Jaco', price: 100},
        {id: 12330, name: 'Jaco', price: 100}
    ]
  return (
    <main className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Items</h2>
        {items.map((item) => 
        (
          <div key={item.id} className="flex mb-2">
            <p className="w-1/2 text-gray-700 truncate">{item.name}</p>
            <p className="w-1/2 text-right font-medium text-gray-700">₱{item.price}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
        <h2 className="text-lg mb-2">Payment</h2>
      </section>

      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
        <h2 className="text-lg mb-2">Delivery Info</h2>
        <label className="mb-4">House number / Unit no.</label>
        <h3 className="mb-4">Street</h3>
        <h3 className="mb-4">Baranggay</h3>
        <h3 className="mb-4">City</h3>
        <h3 className="mb-4">Province</h3>
      </section>
      <Link to="/success" className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full inline-flex justify-center items-center w-full">
        Order 
        </Link>
    </main>
  );
}

export default CheckoutView;
