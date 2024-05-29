
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { code } = useParams();
  const [product, setProduct] = useState({
    "description": "",
    "name": "",
    "price": 0,
    "quantity": 0,
    "type": "meat",
    "unit": "kg",
    "_id": ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/${code}`)
    .then(body => {
        setProduct(body.data);
      } )
      .catch(error => console.error('Error fetching product details:', error));
  }, []);

  const addToCart = async () => {
    
    await axios.post(`http://localhost:3000/api/shopping-cart`, {
      productName: product.name,
      productId: product._id,
      price: product.price['$numberDecimal'],
      quantity: product.quantity
    }, {withCredentials: true}).then(res => console.log(res));
  }


  return (
    <main  className="flex flex-col w-full h-full justify-center items-center">
        <div className='md:ml-10 flex place-self-start'>
            <Link to="/products" className='m-5 shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 absolute top-20'>Go Back</Link>
        </div>
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2  p-4 rounded-lg flex flex-col items-center flex-shrink-0 shadow-md rounded-t-md space-y-3 m-5 ">
          <img className='w-full sm:w-2/5 md:w-1/3 lg:w-1/4' src={product.image_url} />
          <div className="flex justify-between w-full p-1 g-3 space-x-10 font-bold text-2xl">       
            <span>{product.name}</span>
            <span>₱{product.price["$numberDecimal"]}</span>
          </div>
          <p>{product.description}</p>
          {product.quantity === 0 ? <p className='text-red-500'>Out of stock</p> : <></>}
          {product.quantity > 0 ? <button onClick={addToCart} key={product._id} className='w-full sm:w-2/5 md:w-1/3 lg:w-1/4 shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2'>Add to Cart</button> : <></>}
        </div>
    </main>
  );
}

export default ProductDetail;