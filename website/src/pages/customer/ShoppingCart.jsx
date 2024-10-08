import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from "../../components/common/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/common/LoadingScreen";

function ShoppingCart() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setAsLoading] = useState(true);
    const {role} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (role === undefined) {
            navigate("/", {replace: true});
            return;
        }

        axios.get(`http://localhost:3000/api/shopping-cart`)
            .then(response => {
                setItems(response.data)
                let t = 0;
                items.map((item) => {
                    t += Number(item.price["$numberDecimal"])
                });
                setTotal(t);
                setAsLoading(false);
            });
    }, [items]);

    const handleDelete = (itemId) => {
        axios.delete(`http://localhost:3000/api/shopping-cart/${itemId}`)
    };

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <main className="relative w-full h-full overflow-x-hidden gap-6">
            <h1 className="w-screen h-auto text-center block mt-20 mb-2 font-bold text-3xl">Shopping Cart</h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-3 md:flex-col justify-center">
                {
                    items.map((item) => (
                    <div key={item._id} className="flex flex-col text-m flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-2">
                        <div className="flex justify-between w-full p-2 space-x-3">
                            <span className="space-x-3">
                                <Link to={`/products/${item.productId}`}>{item.productName}</Link>
                                <span className="text-gray-600 text-opacity-60 text-sm">{item.quantity}kg</span>
                            </span>
                            <span className="flex flex-row">₱{Number(item.price["$numberDecimal"])}</span>
                            <span>
                                <button onClick={() => handleDelete(item._id)} className="flex items-center gap-2 text-red-500">
                                    <img src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-trash-icon-png-image_865253.jpg" alt="Delete" style={{ width: '20px', height: '20px' }} />
                                </button>
                            </span>
                        </div>
                    </div>
                    ))
                }
                <div className="flex justify-between space-x-40 text-1xl">
                    <span>Total:</span>
                    <span>₱{total}</span>
                </div>
                {total === 0 ? <>
                    <button className="flex justify-center items-center w-80 p-3 rounded-full shadow-sm bg-gray-700 text-off-white text-2xl font-bold cursor-not-allowed" disabled> Checkout</button>
                </> : <>
                <Link to="/checkout-view" className="flex justify-center items-center w-80 p-3 rounded-full shadow-sm bg-green-700 text-off-white text-2xl font-bold"> Checkout</Link>
                </>}
                
            </div>
        </main>
    );
}

export default ShoppingCart;