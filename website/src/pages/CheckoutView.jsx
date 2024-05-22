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

//   useEffect(() => 
//   {
//     const [OrderDetails, setOrderDetails] = 
//     useState(
//       {
//         payment: 0,
//         house_num: '',
//         street: '',
//         brgy: '',
//         city: '',
//         province: ''
//       });

//   const [missingPayment, setPaymentAsMissing] = useState(false);
//   const [missingHouseNo, setHouseNoAsMissing] = useState(false);
//   const [missingStreet, setStreetAsMissing] = useState(false);
//   const [missingBrgy, setBrgyAsMissing] = useState(false);
//   const [missingCity, setCityAsMissing] = useState(false);
//   const [missingProvince, setProvinceAsMissing] = useState(false);
  
//   const handleChange = (e) => 
//   {
//     const {name, value} = e.target;
    
//     setOrderDetails(prevState => 
//       ({
//         ...prevState,
//         [name]: value,
//       }));
//   };

//   const signup = async () => 
//   {
//     // set false by default
//     setPaymentAsMissing(false);
//     setHouseNoAsMissing(false);
//     setStreetAsMissing(false);
//     setBrgyAsMissing(false);
//     setCityAsMissing(false);
//     setProvinceAsMissing(false);

//     if (OrderDetails.payment === "")
//       setPaymentAsMissing(true);

//     if (OrderDetails.house_num === "")
//       setHouseNoAsMissing(true);

//     if (OrderDetails.street === "")
//       setStreetAsMissing(true);

//     if (OrderDetails.brgy === "")
//       setBrgyAsMissing(true);

//     if (OrderDetails.city === "")
//       setCityAsMissing(true);

//     if (OrderDetails.province === "")
//       setProvinceAsMissing(true);

//     if (missingPayment || missingHouseNo || missingStreet || missingBrgy || missingCity || missingProvince)
//     {
//         // short circuit sign up
//         return;
//     }
    
//     // await axios.post('http://localhost:3000/api/auth/sign-up', {
//     //     firstName: signupData.firstName,
//     //     middleName: signupData.middleName === '' ? null : signupData.middleName,
//     //     lastName: signupData.lastName,
//     //     email: signupData.email,
//     //     password: signupData.password
//     // }).then((response) => {
//     //     // save role
//     //     setRole(response.data.role);
//     //       // create expiry date then store expiry datetime
//     //     const expiresIn = DateTime.now().plus({seconds: response.data.expiresIn});
//     //     // redirect to home page
//     //     navigate("/", {replace: true});
//     // }).catch((err) => {
//     //     console.log(err);
//     //     switch (err.response.status){
//     //         case 400:
//     //             // notify user of invalid credentials
//     //             console.log(err.response.detail)
//     //             break;
//     //         default:
//     //             // server error (prolly)
//     //             // notify user
//     //             alert("Server error. Try contacting the website administrator.");   // change this later on?
//     //             break;
//     //     }
//     // });
// }
//     // if (role === undefined) 
//     // {
//     //   navigate("/", {replace: true});
//     //   return;
//     // }
//     // set items ko muna para hindi na magsave ng code 
//     axios.get(`http://localhost:3000/api/shopping-cart`)
//         .then(response => 
//         {
//             setItems(response.data)
//             let t = 0;
//             items.map((item) => 
//             {
//               t += parseFloat(item.price["$numberDecimal"])
//             });
//             setTotal(t);
//         });
//   }, []);

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
