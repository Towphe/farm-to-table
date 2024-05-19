import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

//const products = [{code: 'Luya', Image: 'https://assets.epicurious.com/photos/58d3fed8e2c8295cfbf4a52f/master/pass/ginger_root_pile_23032017.jpg', desc:'420.69'}, {code: 'Patatas', Image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQL10SiAaQxje_j6zT5Wlg92SOv9XfExLMkhEHxrJM-lN_7LBL9', desc:'420.69'}, {code:'Repolyo', Image: 'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-97704047/97704047.jpg', desc:'420.69'}]

function ProductList(){

    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/products')
          .then(response => {
            setProducts(response.data.products);
            setPageCount(response.data.pages)
            
          })
          .catch(error => console.error('Error fetching products:', error));
      }, []);


      return (
        // <main className="relative flex flex-col w-full h-full justify-center items-center">
        <main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
            <h1 className="w-screen h-auto text-center absolute top-4 block m-4 font-bold text-2xl">Product List</h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-3 md:flex-col justify-center mt-24">
                {products.map((product) => (
                    <div key={product._id} className="flex flex-col text-m flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-2">
                        <div className="flex justify-between w-full p-2 space-x-3">
                            <span className="space-x-3">
                                <span>Product Id: {product._id}</span>
                            </span>                            
                            <span>
                            
                                <button className="flex items-center gap-2 text-text-orange-500">
                                  <Link to={`/admin/products/${product._id}`}>
                                    Show More
                                  </Link>
                                </button>

                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <ul className="absolute w-screen text-center bottom-16 text-x3">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => <li key={n}><Link to="/admin/product">{n}</Link></li>)}
            </ul>
        </main>
      );
    }

export default ProductList;