import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function OrdersList()
{
    const orders = 
    [
        {transactionId: 134290, item: 'Chips', qty: 10}, 
        {transactionId: 134290, item: 'Chopsticks', qty: 20}, 
        {transactionId: 134290, item: 'Book', qty: 2}, 
        {transactionId: 134290, item: 'Phone', qty: 5}, 
        {transactionId: 134290, item: 'headphones', qty: 4}, 
        {transactionId: 134290, item: 'laptop', qty: 1},
        {transactionId: 134290, item: 'aquaflask', qty: 5}, 
        {transactionId: 134290, item: 'Chopsticks', qty: 20}, 
        {transactionId: 134290, item: 'Manila Paper', qty: 50}, 
        {transactionId: 134290, item: 'Cartolina', qty: 5}
    ]

    // const [orders, setOrders] = useState([]);
    // const [pageCount, setPageCount] = useState();

    // useEffect(() => {
    //     axios.get('http://localhost:3000/api/order/ordered-items')
    //       .then(response => 
    //       {
    //         setOrders(response.data.orders);
    //         setPageCount(response.data.pages)
    //       })
    //       .catch(error => console.error('Cannot retrieve ordered items:', error));
    //   }, []);
      
      return (
        <main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
            <h1 className="w-screen h-auto text-center absolute top-6 block font-bold text-2xl"> Order List </h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-5 md:flex-col justify-center mt-24">
                {orders.map((order) => 
                (
                    <div key={order.transactionId} className="flex flex-col text-m flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-2">
                        <div className="flex justify-between w-full p-2 space-x-10">
                            <span className="space-x-5">
                                <span><b>ID: {order.transactionId}</b></span>
                                <span>{order.item}</span>
                                <span>QTY: {order.qty}</span>
                            </span>                            
                            <span>
                            
                                <button className="flex items-center gap-2 text-text-orange-500">
                                  <Link to={`#`}>
                                    <i>Show More</i>
                                  </Link>
                                </button>

                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <ul className="absolute w-screen text-center bottom-16 text-x3">
            {/* {Array.from({length: pageCount}, (v, k) => k+1).map((n) => <li key={n}><Link to="#">{n}</Link></li>)} */}
            </ul>
        </main>
    );
};

export default OrdersList;