import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useAuth } from "../components/common/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen.jsx";

function OrdersList(){
    const {role} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setAsLoading] = useState(true);


    useEffect(() => {
        if (role === undefined) {
            navigate("/sign-in", {replace: true});
            return;
        }

        axios.get('http://localhost:3000/api/orders')
          .then(response => 
          {
            console.log(response.data)
            setOrders(response.data);
            setAsLoading(false);
          })
          .catch(error => console.error('Cannot retrieve ordered items:', error));
    }, [])

    const getStatusString = (status) => {
        switch(status){
            case 0:
                return 'Pending';
            case 1:
                return <span className="text-dark-green">Completed</span>;
            case 2:
                return <span className="text-red-800">Cancelled</span>;
        }
    };

    if (isLoading){
        return <LoadingScreen />
    }
      
      return (
        <main className="relative w-full h-full overflow-x-hidden gap-6">
            <h1 className="w-screen h-auto text-center absolute top-6 block font-bold text-2xl"> Order List </h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-5 md:flex-col justify-center mt-24">
            <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => <tr className="border-b dark:border-gray-700" key={order._id}>
                        <td className="py-4">{order._id}</td>
                        <td>{getStatusString(order.status)}</td>
                        <td>{order.totalPrice}</td>
                        <td className="font-light hover:opacity-80"><Link to={`/orders/${order._id}`}>View More</Link></td>
                    </tr>)}
                </tbody>
            </table>
            </div>
        </main>
    );
};

export default OrdersList;