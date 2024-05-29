import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/common/AuthProvider.jsx";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/common/LoadingScreen.jsx";

function OrdersList(){
    const {role} = useAuth();
    const [orders, setOrders] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setAsLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState(searchParams.get('filter') || '');
    const navigate = useNavigate();

    const fetchOrders = () => {
        if (role === undefined) {
            navigate("/sign-in", {replace: true});
            return;
        }

        const params = new URLSearchParams({
            p: searchParams.get('p') ?? 1,
            c: searchParams.get('c') ?? 10,
            filter
        });

        axios.get(`http://localhost:3000/api/orders?${params.toString()}`)
          .then(response => 
          {
            setOrders(response.data.orders);
            setPageCount(response.data.pages);
          })
          .catch(error => console.error('Cannot retrieve ordered items:', error));
    }

    useEffect(() => {
        fetchOrders();
        setAsLoading(false);
    }, [searchParams, filter])

    const handleStatusFilterChange = (e) => {
        setFilter(e.target.value);
        setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value });
    };

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
        <main className="w-full h-full overflow-x-hidden gap-6 pt-10">
            <h1 className="w-screen h-auto text-center block font-bold text-2xl"> Order List </h1>
            <div className="flex flex-shrink-0 flex-row gap-3 md:flex-row justify-center px-20 pt-4">
              <label htmlFor="status">Status</label>
              <select className="font-semibold text-yellow-600" name="status" id="sorting" value={filter} onChange={handleStatusFilterChange}>
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-5 md:flex-col justify-center mt-6">
            <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => <tr className="border-b dark:border-gray-700" key={order._id}>
                        <td className="py-4">{order._id}</td>
                        <td>{getStatusString(order.status)}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td className="font-light hover:opacity-80"><Link to={`/orders/${order._id}`}>View More</Link></td>
                    </tr>)}
                </tbody>
            </table>
            </div>
            <ul className="flex gap-6 justify-center w-screen text-center bottom-16 text-x3 py-6">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => (<li key={n}>
              <Link to={`/orders?p=${n}&c=${10}`}>{n}</Link>
              </li>))}
            </ul>
        </main>
    );
};

export default OrdersList;
