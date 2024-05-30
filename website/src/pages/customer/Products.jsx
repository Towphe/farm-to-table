import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import LoadingScreen from "../../components/common/LoadingScreen.jsx";
import { useAuth } from "../../components/common/AuthProvider.jsx";
import PopupNotification from "../../components/common/PopupNotfication.jsx";

function Products(){

    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState(searchParams.get('sort') || 'name');
    const [filter, setFilter] = useState(searchParams.get('filter') || '');
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const {role} = useAuth();
    const navigate = useNavigate();

    const fetchProducts = () => {
      const params = new URLSearchParams({
          p: searchParams.get('p') ?? 1,
          c: searchParams.get('c') ?? 10,
          sort,
          filter
      });

      axios.get(`http://localhost:3000/api/product?${params.toString()}`)
        .then(response => {
          setProducts(response.data.products);
          setPageCount(response.data.pages);

        })
        .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
      fetchProducts();
      setIsLoading(false);
  }, [searchParams, sort, filter]);

    const addToCart = async (e) => {
      // if user is unauthenticated, renavigate to signin
      if (role === undefined){
        navigate("/sign-in", {replace: true});
        return;
      }
        
      const productId = e.target.getAttribute('data-product-id').split("-")[1];
      const product = products.filter((p) => p._id == productId)[0];
      console.log(product.price);
      await axios.post(`http://localhost:3000/api/shopping-cart`, {
        productName: product.name,
        productId: product._id,
        price: parseFloat(product.price['$numberDecimal']),
        quantity: product.quantity
      }, {withCredentials: true});

      const toRef = setTimeout(() => {
        setShowPopup(true);
        clearTimeout(toRef);
      }, 100);
      setShowPopup(false);
    };

    const handleSortChange = (e) => {
      setSort(e.target.value);
      setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value });
  };

  useEffect(() => {
    if (showPopup){
      const toRef = setTimeout(() => {
        setShowPopup(false);
        clearTimeout(toRef);
      }, 2000)
    }
  }, [showPopup]);

  const handleFilterChange = (e) => {
      setFilter(e.target.value);
      setSearchParams({ ...Object.fromEntries(searchParams), filter: e.target.value });
  };

    if (isLoading){
      return (<LoadingScreen />)
    }

    return (
        <main className="relative w-full h-full overflow-x-hidden">
          <h1 className="w-screen h-auto text-center block py-6 font-bold text-3xl">Available Products</h1>
          {showPopup ? <PopupNotification message="Added to cart" status="success" /> : <></>  }
          <div className="flex flex-shrink-0 flex-row gap-3 md:flex-row justify-center px-20 pt-4">
              <label htmlFor="sorting"> Sort by:</label>
              <select className="font-semibold text-yellow-600" name="sorting" id="sorting" value={sort} onChange={handleSortChange}>
                  <option value="name">Alphabetical</option>
                  <option value="quantity">Quantity</option>
                  <option value="price">Price</option>
              </select>

              <label htmlFor="filtering"> Filter by Type:</label>
              <input
                  type="text"
                  className="font-semibold text-yellow-600"
                  name="filtering"
                  id="filtering"
                  value={filter}
                  onChange={handleFilterChange}
                  placeholder="Enter product type"
              />
            </div>
          <div className="w-screen h-auto flex flex-col flex-wrap items-center gap-6 md:flex-row justify-center">
            {products.map((product) => (
              <div key={product._id} className="w-1/2 md:w-1/4 lg:w-1/5 flex flex-col flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-60 p-3">
                <img src={product.image_url} className="w-3/4 aspect-square object-cover" />
                <div className="flex justify-between w-full p-2">
                  <span>
                  <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </span>
                  <span>₱ {product.price["$numberDecimal"]}</span>
                </div>
                {product.quantity > 0 ? <button data-product-id={"button-" + product._id} onClick={addToCart} className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 hover:opacity-75'>Add to Cart</button> : <button data-product-id={"button-" + product._id} className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-gray-500 cursor-not-allowed p-2 hover:opacity-75 disabled: '>Add to Cart</button>}
                
              </div> 
            ))}
          </div>
          <ul className="flex justify-center gap-4 w-screen text-center text-xl py-6 md:bottom-0">
            {Array.from({length: pageCount}, (v, k) => k+1).map((n) => <li key={n}><Link to={`/products?p=${n}&c=${10}`}>{n}</Link></li>)}
          </ul>
        </main>
      );
    }

export default Products;