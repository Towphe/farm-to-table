import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function Products(){

    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/product')
          .then(response => {
            setProducts(response.data.products);
            setPageCount(response.data.pages)
            
          })
          .catch(error => console.error('Error fetching products:', error));
      }, []);

      const goToCart = () => {
        history.push('/Shopping-Cart');
      };

      const addToCart = async (e) => {
        
        const productId = e.target.getAttribute('data-product-id').split("-")[1];
        const product = products.filter((p) => p._id == productId)[0];
        
        await axios.post(`http://localhost:3000/api/shopping-cart`, {
          productName: product.name,
          productId: product._id,
          price: product.price,
          quantity: product.quantity
        }, {withCredentials: true});
      };

      return (
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
                  <td>₱ {product.price["$numberDecimal"]}</td>
                </div>
                <button data-product-id={"button-" + product._id} onClick={addToCart} className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 hover:opacity-75'>Add to Cart</button>
              </div> 
            ))}
            <div className='md:ml-10 flex place-self-start'>
            <Link to="/Shopping-Cart"className='m-5 shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 absolute top-20'>Shopping Cart</Link>
            </div>        
          </div>
          <ul className="absolute w-screen text-center bottom-4 text-xl">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => <li key={n}><Link to={`/products?p=${n}&c=${10}`}>{n}</Link></li>)}
          </ul>
        </main>
      );
    }

export default Products;