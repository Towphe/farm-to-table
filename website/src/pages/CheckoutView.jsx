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
  const {role} = useAuth();
  const navigate = useNavigate();
  
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [OrderDetails, setOrderDetails] = 
    useState(
      {
        house_num: '',
        street: '',
        brgy: '',
        city: '',
        province: ''
      });

  const handleChange = (e) => 
  {
    const {name, value} = e.target;
    
    setOrderDetails(prevState => 
    ({
        ...prevState,
        [name]: value,
    }));
  };

  const handlePaymentChange = (e) =>
  {
    const { value } = e.target;
    const parsedVal = parseFloat(value);

    if(!isNaN(parsedVal) && (parsedVal >= total))
      setPayment(parsedVal);

    else
      setPayment(0);
  };

  useEffect(() => 
  {
    const isFormValid = Object.values(OrderDetails).every(value => value.trim() !== '');
    setFormValid(isFormValid && payment >= total);
  }, [OrderDetails, payment, total]);

  useEffect(() => 
  {
    // if (role === undefined) 
    // {
    //     navigate("/", {replace: true});
    //     return;
    // }
     
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

  const ordersuccess = async () =>
  {
    try 
    {
      const currentDate = new Date();

      const formattedDate = currentDate.toLocaleDateString('en-US',
      {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
      });

      const saveOrderDetails = await axios.post('http://localhost:3000/api/order/create-order',
      {
        status: 1,
        totalPrice: total,
        createdAt: formattedDate,
        house_num: OrderDetails.house_num,
        street : OrderDetails.street,
        brgy: OrderDetails.brgy,
        city : OrderDetails.city,
        province : OrderDetails.province
      });
    } 
    
    catch (error)
    {

    }
  };

  // place here yung post request galing sa order
  // if successful, delete lahat ng items sa shopping cart
  return (
    <main className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <section className="flex flex-col border border-gray-400 rounded-md p-4 mb-4">
        <h2 className="text-lg mb-2 font-bold">Items</h2>
        {items.map((item) => 
        (
          <div key={item._id} className="flex mb-2">
            <p className="w-9 text-green-700 font-bold">{item.quantity}x</p>
            <p className="w-1/2 text-gray-700 truncate">{item.productName}</p>
            <p className="w-1/2 text-right font-medium text-green-700">
              + ₱{Number(item.price["$numberDecimal"])}
            </p>
          </div>
        ))}
        <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className="flex mb-2 font-semibold">
          <p className="w-1/2 text-black-700 truncate">TOTAL :</p>
          <p className="w-1/2 text-right text-black-700">₱{total}</p>
        </div>
      </section>
      <section className="flex flex-col border border-gray-400 rounded-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <div className="flex flex-row items-start justify-left gap-7">
          <input type="checkbox" id="flowbite-option" className="hidden peer" checked={isCashOnDelivery} onChange={() => setIsCashOnDelivery(!isCashOnDelivery)}/>
          <label for="flowbite-option" className="inline-flex flex-col items-start justify-center p-5 text-black border-2 border-yellow-400 rounded-2xl cursor-pointer dark:text-gray-500 dark:peer-checked:text-black dark:bg-yellow-50 dark:border-gray-300 dark:peer-checked:bg-yellow-400 peer-checked:border-black">
            <div className="block">
              <div className="w-full text-[15px] font-semibold">Cash on Delivery (COD)</div>
              <div className="w-full text-[13px]">Cash on Delivery</div>
            </div>
          </label>
          <div className="flex flex-col">
            <label className="block text-black text-md mb-2" for="pay"> 
              Cash Amount <span className="text-red-500">*</span>
            </label>
            <input name="payment" onChange={handlePaymentChange} className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isCashOnDelivery ? 'pointer-events-none opacity-50' : ''}`} id="pay" type="number" min='0' placeholder={`> ${total}`} required={isCashOnDelivery}/>
          </div>
        </div>
      </section>
      <section className="flex flex-col border border-gray-400 rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Delivery Info</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="house-number">
          House number / Unit no. <span className="text-red-500">*</span>
        </label>
        <input name="house_num" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="house-number" type="text" placeholder="e.g., Rm. 3102" required/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="street">
          Street <span className="text-red-500">*</span>
        </label>
        <input name="street" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="street" type="text" placeholder="e.g., Emerald Street" required/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="brgy">
          Baranggay <span className="text-red-500">*</span>
        </label>
        <input name="brgy" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="brgy" type="text" placeholder="e.g., Brgy. Batong Malake" required/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="city">
          City <span className="text-red-500">*</span>
        </label>
        <input name="city" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="e.g., Quezon City" required/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md mb-2" for="province">
          Province <span className="text-red-500">*</span>
        </label>
        <input name="province" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="province" type="text" placeholder="e.g., Quezon" required/>
      </div>
      </section>
      <Link to="/success" onClick={ordersuccess} className={`bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full inline-flex justify-center items-center w-full ${!formValid ? 'pointer-events-none opacity-50' : ''}`}>
        Order 
      </Link>
    </main>
  );
}

export default CheckoutView;