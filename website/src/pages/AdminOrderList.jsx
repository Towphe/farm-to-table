// if pending order, 2 buttons to either cancel order or approve
// return table
import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import LoadingScreen from "../components/common/LoadingScreen";

function AdminOrderList()
{
  const [isLoading, setAsLoading] = useState(true);
  const navigate = useNavigate();

  // const orders = 
  // [
  //     {_id: 1, user:'Jaco', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 2, user: 'Noche', transactionId: 134290, date:'12/20/2024', status: 0, total: 1200}, 
  //     {_id: 3, user: 'Luis', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 4, user: 'Rivera', transactionId: 134290, date:'12/20/2024', status: 0, total: 1200}, 
  //     {_id: 5, user: 'Noch', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 6, user: 'test', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200},
  //     {_id: 7, user: 'Nsd', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 8, user: 'Nf', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 9, user: 'Nm', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
  //     {_id: 10, user: 'momhe', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}
  // ]
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/orders")
      .then(res => {
        setOrders(res.data.orders);
        setAsLoading(false);
      })
      .catch(err => console.log(err));
  }, [orders])

  const approveOrder = (orderId) => {
    axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/confirm`)
      .then((res) => {
        navigate("/admin/orders", {replace: true});
        return;
      });
  }

  const rejectOrder = (orderId) => {
    console.log(orderId)
    axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/reject`)
      .then((res) => {
        navigate("/admin/orders", {replace: true});
        return;
      });
  }

  if (isLoading){
    return <LoadingScreen />
  }

  return (
      <main className="relative w-full h-full overflow-x-hidden gap-6 pt-10">
          <h1 className="w-screen h-auto text-center block m-4 font-bold text-2xl">Order List</h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-3 md:flex-col justify-center mt-16">
                <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                  <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                      <th>User ID</th>
                      <th>Transaction Date</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map((order) => (
                        <tr className="border-b dark:border-gray-700" key={order._id}>
                          <td className="py-6 uppercase">
                              {order.userId}
                          </td>
                          <td>{order.createdAt}</td>
                          {/* set pending if status is 0  and red color*/}
                          {/* if 1, set as completed and green color */} 
                          <td>
                            {order.status === 1 ? <i className="text-green-600">completed</i> : <i className="text-gray-400">pending</i>}
                          </td>
                          <td className="text-center font-semibold">₱{order.totalPrice}</td>
                          <td>
                            <button onClick={() => approveOrder(order._id)} className={`bg-green-400 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Approve
                            </button>
                          </td>
                          <td>
                            <button onClick={() => rejectOrder(order._id)} className={`bg-red-400 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Cancel
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            </div>
            {/* <ul className="absolute w-screen text-center bottom-16 text-x3">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => (<li key={n}>
              <Link to={`/admin/products?p=${n}&c=${10}&sort=${sort}&filter=${filter}`}>{n}</Link>
              </li>))}
            </ul> */}
        </main>
      );
}

export default AdminOrderList;