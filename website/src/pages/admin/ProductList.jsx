import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useSearchParams} from 'react-router-dom';
import LoadingScreen from "../../components/common/LoadingScreen";

function ProductList(){

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'name');
  const [filter, setFilter] = useState(searchParams.get('filter') || '');
  const [isLoading, setAsLoading] = useState(true);

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
      setAsLoading(false);
  }, [searchParams, sort, filter]);

  const handleSortChange = (e) => {
      setSort(e.target.value);
      setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value });
  };

  const handleFilterChange = (e) => {
      setFilter(e.target.value);
      setSearchParams({ ...Object.fromEntries(searchParams), filter: e.target.value });
  };

  if (isLoading){
    return <LoadingScreen />
  }

  return (
      <main className="relative w-full h-full overflow-x-hidden gap-6 pt-10">
          <h1 className="w-screen h-auto text-center block m-4 font-bold text-2xl">Product List</h1>
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
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-3 md:flex-col justify-center mt-16">
                <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                  <thead className="text-md text-slate-800 uppercase ">
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product) => (
                        <tr className="border-b dark:border-gray-700" key={product._id}>
                          <td className="py-6">
                            <Link to={`/admin/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </td>
                          <td>{product.type}</td>
                          <td>{product.quantity}</td>
                          <td>{product.unit}</td>
                          <td>₱ {product.price["$numberDecimal"]}</td>
                          <td className="hover:cursor-pointer">
                            <button>
                              <Link to={`/admin/edit-product/${product._id}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                              </Link>
                            </button>
                          </td>
                          <td className=" text-gray-400">
                            <button className="hover:cursor-not-allowed">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <button className="mt-4 hover:opacity-80">
                  <Link to={`/admin/add-product`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  </Link>
                </button>
            </div>
            <ul className="w-screen flex justify-center gap-4 text-center bottom-16 text-x3 py-8">
              {Array.from({length: pageCount}, (v, k) => k+1).map((n) => (<li key={n}>
              <Link to={`/admin/products?p=${n}&c=${10}&sort=${sort}&filter=${filter}`}>{n}</Link>
              </li>))}
            </ul>
        </main>
      );
    }

export default ProductList;