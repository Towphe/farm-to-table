// if pending order, 2 buttons to either cancel order or approve
// return table
import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useSearchParams} from 'react-router-dom';
import LoadingScreen from "../components/common/LoadingScreen";

function AdminOrderList()
{
  const [isLoading, setAsLoading] = useState(true);

  const orders = 
  [
      {_id: 1, user:'Jaco', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 2, user: 'Noche', transactionId: 134290, date:'12/20/2024', status: 0, total: 1200}, 
      {_id: 3, user: 'Luis', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 4, user: 'Rivera', transactionId: 134290, date:'12/20/2024', status: 0, total: 1200}, 
      {_id: 5, user: 'Noch', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 6, user: 'test', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200},
      {_id: 7, user: 'Nsd', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 8, user: 'Nf', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 9, user: 'Nm', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}, 
      {_id: 10, user: 'momhe', transactionId: 134290, date:'12/20/2024', status: 1, total: 1200}
  ]
//   if (isLoading) return <LoadingScreen />

  return (
      <main className="relative w-full h-full overflow-x-hidden gap-6 pt-10">
          <h1 className="w-screen h-auto text-center block m-4 font-bold text-2xl">Order List</h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-3 md:flex-col justify-center mt-16">
                <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                  <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                      <th>UserName</th>
                      <th>ID</th>
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
                          <td className="py-6">
                              {order.user}
                          </td>
                          <td className="italic font-semibold">:{order.transactionId}</td>
                          <td>{order.date}</td>
                          {/* set pending if status is 0  and red color*/}
                          {/* if 1, set as completed and green color */} 
                          <td>
                            {order.status === 1 ? <i className="text-green-600">completed</i> : <i className="text-gray-400">pending</i>}
                        </td>
                          <td className="font-semibold">₱{order.total}</td>
                          <td>
                            <Link to="#" className={`bg-green-400 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Approve
                            </Link>
                          </td>
                          <td>
                            <Link to="#" className={`bg-red-400 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md inline-flex justify-center items-center w-full ${order.status === 0 ? '': 'hover:cursor-not-allowed opacity-0'}`}>
                                Cancel
                            </Link>
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