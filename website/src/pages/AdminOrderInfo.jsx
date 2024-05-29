import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../components/common/AuthProvider.jsx";
import LoadingScreen from "../components/common/LoadingScreen.jsx";
import axios from "axios";
import { DateTime } from "luxon";

function AdminOrderInfo(){
    const navigate = useNavigate();
    const {orderId} = useParams();
    const {role} = useAuth();
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setAsLoading] = useState(true);
    const [isPending, setAsPending] = useState(false);

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
                if (res.data.details.status === 0){
                    setAsPending(true)
                }else{
                    setAsPending(false);
                }
            })
            .catch(err => console.log(err));
            setAsLoading(false);
    }, [isPending]);

    if (isLoading){
        return <LoadingScreen />
    }

    const approveOrder = (orderId) => {
        axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/confirm`)
          .then((res) => {
            navigate("/admin/orders", {replace: true});
            setAsPending(false);
            return;
          });
      }
    
      const rejectOrder = (orderId) => {
        axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/reject`)
          .then((res) => {
            navigate("/admin/orders", {replace: true});
            setAsPending(false);
            return;
          });
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
        <main className="w-full h-full px-8 py-16">
            <div className="text-lg">
                {/* contains product details */}
                <h2 className="text-2xl font-bold">Order Details</h2>
                <span className="block">Order Id: <span className="font-bold">{orderDetails._id}</span></span>
                <span className="block">Created {orderDetails.createdAt}</span>
                <span className="block">
                    Status: <span className="font-semibold">{getStatus(orderDetails.status)}</span>
                </span>
            </div>
            <div className="w-full flex gap-4 flex-wrap sm:flex-nowrap justify-start items-start">
                <div className="w-full sm:w-11/12">
                    <h3 className="text-xl font-bold">Items</h3>
                    <table className="w-11/12 text-md text-left rtl:text-right text-slate-800">
                    <thead className="text-md text-slate-800 uppercase ">
                        <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map(orderItem => 
                            <tr key={orderItem._id}>
                                <td>
                                    <img src={orderItem.detail[0].image_url} className="w-24" />
                                </td>
                                <td>{orderItem.detail[0].name}</td>
                                <td>{orderItem.quantity}</td>
                                <td>{orderItem.detail[0].unit}</td>
                                <td>₱ {orderItem.price}</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                <div className="w-full sm:1/12">
                    <h3 className="text-xl font-bold">Address Info</h3>
                    <p>Street: <span>{orderDetails.street}</span></p>
                    <p>Baranggay: <span>{orderDetails.brgy}</span></p>
                    <p>City: <span>{orderDetails.city}</span></p>
                    <p>Province: <span>{orderDetails.province}</span></p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-2">
                {orderDetails.status === 0 ? <button onClick={() => rejectOrder(orderId)} className="block w-full md:w-1/2 lg:w-1/3 bg-red-800 text-off-white font-semibold py-2 rounded-lg hover:opacity-80">Cancel Order</button> : <></>}
                {orderDetails.status === 0 ? <button onClick={() => approveOrder(orderId)} className="block w-full md:w-1/2 lg:w-1/3 bg-dark-green text-off-white font-semibold py-2 rounded-lg hover:opacity-80">Accept Order</button> : <></>}
            </div>
            
        </main>
    )
}

export default AdminOrderInfo;