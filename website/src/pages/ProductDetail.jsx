
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    axios.get(`http://localhost:3000/api/product/productInfo/${code}`)
    .then(body => {
        setProduct(body.data);
      } )
      .catch(error => console.error('Error fetching product details:', error));
  }, []);


  return (
    <main  className="flex flex-col w-full h-full justify-center items-center">
        <div className='flex place-self-start'>
            <button className='flex flex-shrink-0 m-5 shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 absolute top-20'>Go Back</button>
        </div>
        <div className="flex flex-col flex-shrink-0 shadow-md rounded-t-md space-y-3 m-5 ">
        <div className="flex justify-between w-full p-1 g-3 space-x-10 font-bold text-2xl">       
            <span>{product.name}</span>
            <span>P{product.price}</span>
        </div>
        <p>{product.description}</p>
        <p>Quantity: {product.quantity}</p>
        <button className='shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2'>Add to Cart</button>
        </div>
    </main>

  );
}

export default ProductDetail;