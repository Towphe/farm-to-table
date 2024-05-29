import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../components/common/AuthProvider.jsx";
import LoadingScreen from "../components/common/LoadingScreen.jsx";
import axios from "axios";
import { DateTime } from "luxon";

function OrderInfo(){
    const navigate = useNavigate();
    const {orderId} = useParams();
    const {role} = useAuth();
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setAsLoading] = useState(true);

    useEffect(() => {
        if (role === undefined){
            navigate("/sign-in", {replace: true});
            return;
        }
        // query order detail
        axios.get(`http://localhost:3000/api/orders/${orderId}`)
            .then(res => {
                setOrderDetails(res.data.details);
                console.log(res.data.details);
                setOrderItems(res.data.items);
                console.log(res.data.items);
            })
            .catch(err => console.log(err));
            setAsLoading(false);
    }, []);

    if (isLoading){
        return <LoadingScreen />
    }

    const getStatus = (statusInt) => {
        switch(statusInt){
            case 0:
                return "Pending";
            case 1:
                return "Completed";
            case 2:
                return "Cancelled";
        }
    }

    return (
        <main className="w-full h-full px-6 py-4">
            <div className="text-lg">
                {/* contains product details */}
                <h2 className="text-2xl font-bold">Order Details</h2>
                <span className="block">Order Id: <span className="font-bold">{orderDetails._id}</span></span>
                <span className="block">Created {orderDetails.createdAt}</span>
                <span className="block">
                    Status: <span className="font-semibold">{getStatus(orderDetails.status)}</span>
                </span>
            </div>
            <div>
                <h3 className="text-xl font-bold">Items</h3>
                <table className="w-11/12 text-md text-left rtl:text-right text-slate-800">
                  <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                <tbody>
                    {orderItems.map(orderItem => 
                        <tr key={orderItem._id}>
                            <td>
                                <img src={orderItem.detail[0].image_url} className="w-16" />
                            </td>
                            <td>{orderItem.detail[0].name}</td>
                            <td>{orderItem.quantity}</td>
                            <td>₱ {orderItem.price}</td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center">
                {orderDetails.status === 0 ? <button className="block w-full md:w-1/2 lg:w-1/3 bg-red-800 text-off-white font-semibold py-2 rounded-lg mt-6 hover:opacity-80">Cancel Order</button> : <></>}
            </div>
            
        </main>
    )
}

export default OrderInfo;