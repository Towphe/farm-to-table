import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

//const products = [{code: 'Luya', Image: 'https://assets.epicurious.com/photos/58d3fed8e2c8295cfbf4a52f/master/pass/ginger_root_pile_23032017.jpg', desc:'420.69'}, {code: 'Patatas', Image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQL10SiAaQxje_j6zT5Wlg92SOv9XfExLMkhEHxrJM-lN_7LBL9', desc:'420.69'}, {code:'Repolyo', Image: 'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-97704047/97704047.jpg', desc:'420.69'}]

function Products(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/product/showProducts')
          .then(response => setProducts(response.data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);
    

      return (
        <main className="flex flex-col w-full h-full justify-center items-center">
          <h1 className="m-8 font-bold text-3xl">Available Products</h1>
          <div className="space-y-5">
            {products.map((product, i) => (
              
                <div key={i} className="flex flex-col flex-shrink-0 w-80 h-50 shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 font-medium p-3 items-center">
                <Link to={`/products/${product._id}`}>
                {product.name}
                </Link>
                <div className="flex justify-between w-full p-2">
                  <span>ID: {product._id}</span>
                  <span>P{product.price}</span>
                </div>
                <button className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2'>Add to Cart</button>
              </div>
              
              
            ))}
            
          </div>
        </main>
      );
    }

export default Products;