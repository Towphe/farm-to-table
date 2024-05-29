import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useAuth } from "../components/common/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

function OrdersList(){
    const {role} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (role === undefined) {
            navigate("/sign-in", {replace: true});
            return;
        }

        axios.get('http://localhost:3000/api/orders')
          .then(response => 
          {
            setOrders(response.data);
          })
          .catch(error => console.error('Cannot retrieve ordered items:', error));
    }, [])

    const getStatusString = (status) => {
        switch(status){
            case 0:
                return 'Pending';
            case 1:
                return 'Completed';
            case 2:
                return <span className="text-red-800">'Cancelled'</span>;
        }
    };
      
      return (
        <main className="relative w-full h-full overflow-x-hidden gap-6">
            <h1 className="w-screen h-auto text-center absolute top-6 block font-bold text-2xl"> Order List </h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-5 md:flex-col justify-center mt-24">
                {orders.map(order => 
                    <div key={order._id} className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col text-m flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-2">
                        <span className="font-bold">ID: {order._id}</span>
                        <span>Total: ₱ {order.totalPrice}</span>
                        <span>Status: {getStatusString(order.status)}</span>
                        <span className="font-light hover:opacity-80"><Link to={`/orders/${order._id}`}>Click to see more</Link></span>
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrdersList;