import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from "../components/common/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

// https://v1.tailwindcss.com/components/forms
function CheckoutView() 
{
  // lagay sa isang variable payment and delivery info (stored)
  // after nun post request
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const {role} = useAuth();
  // const navigate = useNavigate();

  useEffect(() => 
  {

    // if (role === undefined) 
    // {
    //   navigate("/", {replace: true});
    //   return;
    // }
    // set items ko muna para hindi na magsave ng code 
    axios.get(`http://localhost:3000/api/shopping-cart`)
        .then(response => 
        {
            setItems(response.data)
            let t = 0;
            items.map((item) => 
            {
              t += parseFloat(item.price["$numberDecimal"])
            });
            setTotal(t);
        });
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {/* malagay ng ellipsis for organization */}
      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Items</h2>
        {items.map((item) => 
        (
          <div key={item._id} className="flex mb-2">
            <p className="w-1/2 text-gray-700 truncate">{item.productName}</p>
            <p className="w-1/2 text-gray-700 truncate">QTY: {item.quantity}</p>
            <p className="w-1/2 text-right font-medium text-gray-700">₱{Number(item.price["$numberDecimal"])}</p>
          </div>
        ))}

        <div className="flex mb-2 font-bold">
          <p className="w-1/2 text-black-700 truncate">TOTAL:</p>
          <p className="w-1/2 text-black-700 truncate">₱{total}</p>
        </div>
      
      </section>
      {/* select box cod only and input field */}
      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
        <h2 className="text-lg mb-2">Payment</h2>
      </section>
      
      {/* input fields lang */}
      <section className="flex flex-col border border-gray-300 rounded-md p-4 mb-4">
      <h2 className="text-lg mb-2">Delivery Info</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="house-number">
          House number / Unit no.
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="house-number" type="text" placeholder="e.g., Rm. 3102"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="street">
          Street
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="street" type="text" placeholder="e.g., Emerald Street"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="brgy">
          Baranggay
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="brgy" type="text" placeholder="e.g., Brgy. Batong Malake"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="city">
          City
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="e.g., Quezon City"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="province">
          Province
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="province" type="text" placeholder="e.g., Quezon"/>
      </div>
      </section>
      <Link to="/success" className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full inline-flex justify-center items-center w-full">
        Order 
        </Link>
    </main>
  );
}

export default CheckoutView;
