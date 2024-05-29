// if pending order, 2 buttons to either cancel order or approve
// return table
import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import LoadingScreen from "../../components/common/LoadingScreen";

function AdminOrderList()
{
  const [isLoading, setAsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  const fetchOrders = () => {
    const params = new URLSearchParams({
        p: searchParams.get('p') ?? 1,
        c: searchParams.get('c') ?? 10
    });

    axios.get(`http://localhost:3000/api/admin/orders?${params.toString()}`)
      .then(response => {
        console.log(response)
        setOrders(response.data.orders);
        setPageCount(response.data.pages);
      })
      .catch(error => console.error('Error fetching products:', error));
};

  useEffect(() => {
    fetchOrders();
    setAsLoading(false);
  }, [searchParams])

  const approveOrder = (orderId) => {
    axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/confirm`)
      .then((res) => {
        navigate("/admin/orders", {replace: true});
        return;
      });
  }

  const rejectOrder = (orderId) => {
    axios.patch(`http://localhost:3000/api/admin/orders/${orderId}/reject`)
      .then((res) => {
        navigate("/admin/orders", {replace: true});
        return;
      });
  }

  const renderStatus = (status) => {
    // {order.status === 1 ? <i className="text-green-600">completed</i> : <i className="text-gray-400">pending</i>}
    switch(status){
      case 0:
        return <i className="text-gray-400">pending</i>
      case 1:
        return <i className="text-green-600">completed</i>
      case 2:
        return <i className="text-red-700">cancelled</i>
    }
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
                      <th>Transaction ID</th>
                      <th>User Id</th>
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
                              <Link to={`/admin/orders/${order._id}`}>
                                {order._id}
                              </Link>
                          </td>
                          <td>{order.userId.toString()}</td>
                          <td>{order.createdAt}</td>
                          {/* set pending if status is 0  and red color*/}
                          {/* if 1, set as completed and green color */} 
                          <td>
                            {renderStatus(order.status)}
                          </td>
                          <td className="text-center font-semibold">₱{order.totalPrice}</td>
                          <td>
                            {order.status === 0 ? <button onClick={() => approveOrder(order._id)} className={`bg-green-400 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Approve
                            </button> : <></>}
                            
                          </td>
                          <td>
                            {order.status === 0 ? <button onClick={() => rejectOrder(order._id)} className={`bg-red-400 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Cancel
                            </button> : <></>}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            </div>
            <ul className="absolute flex justify-center w-screen text-center bottom-16 text-x3">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => (<li key={n}>
              <Link to={`/admin/orders?p=${n}&c=${10}`}>{n}</Link>
              </li>))}
            </ul>
        </main>
      );
}

export default AdminOrderList;