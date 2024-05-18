import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function OrdersList()
{
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/order/ordered-items')
          .then(response => 
          {
            setOrders(response.data.orders);
            setPageCount(response.data.pages)
          })
          .catch(error => console.error('Error fetching items ordered:', error));
      }, []);

      // const addToCart = async (e) => 
      // {
      //   const productId = e.target.getAttribute('data-product-id').split("-")[1];
      //   const product = products.filter((p) => p._id == productId)[0];
        
      //   await axios.post(`http://localhost:3000/api/product/add-to-cart`, 
      //   {
      //     productName: product.name,
      //     productId: product._id,
      //     price: product.price,
      //     quantity: product.quantity
      //   }, {withCredentials: true}).then(res => {
      //     // add pop notif that item has been added to cart later
      //     console.log("Added to cart.")
      //   });
      // };

      return (
        // <main className="relative flex flex-col w-full h-full justify-center items-center">
        <main className="relative w-full h-full overflow-x-hidden">
          <h1 className="w-screen h-auto text-center absolute top-4 block m-4 font-bold text-3xl">Available Products</h1>
          <div className="absolute top-24 w-screen h-auto flex flex-col items-center gap-6 md:flex-row justify-center">
            {products.map((product) => (
              <div key={product._id} className="w-1/2 sm:w-2/5 md:w-1/4 lg:w-1/5 flex flex-col flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-3">
                <img src={product.image_url} className="w-11/12" />
                <div className="flex justify-between w-full p-2">
                  <span>
                  <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </span>
                  <span>P{product.price}</span>
                </div>
                <button data-product-id={"button-" + product._id} onClick={addToCart} className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 hover:opacity-75'>Add to Cart</button>
              </div>
            ))}
          </div>
          <ul className="absolute w-screen text-center bottom-4 text-xl">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => <li key={n}><Link to="/product">{n}</Link></li>)}
          </ul>
        </main>
      );
};

export default OrdersList;

const itemsordered = 
[
    { 
      name: "Hanabishi Ground Fan Hurricane", 
      url: "https://myhanabishi.com/cdn/shop/products/HHURRIC20.png?v=1689151695", 
      id: 1
    },
    
    { 
      name: "Whirpool Auto Washing Machine", 
      url: "https://jnrappliances.com.ph/wp-content/uploads/2021/08/Website-Photo-Whirlpool-4.png", 
      id: 2 
    },
  
    {
      name: "KitchenAid Pro Line Blender", 
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1ehwrmD6BDXqjj0p4FuqXHQuE8mGKRV3LF52L0WClA&s", 
      id: 3 
    },
  
    {
      name: "Tough Mama Rice Cooker", 
      url: "https://toughmamaappliances.com/wp-content/uploads/2019/11/NRC1M-with-slot-handle-lr-.jpg", 
      id: 4
    }
]