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
      return (
      );
};

export default OrdersList;

const itemsOrdered = 
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