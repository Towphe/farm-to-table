
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductInfo() {
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
    axios.get(`http://localhost:3000/api/admin/products/${code}`)
    .then(body => {
        setProduct(body.data);
      } )
      .catch(error => console.error('Error fetching product details:', error));
  }, []);

  const productDetails = [
    { label: "ID", value: product._id },
    { label: "Product Name", value: product.name },
    { label: "Product Type", value: product.type },
    { label: "Product Description", value: product.description },
    { label: "Product Quantity", value: product.quantity }
  ];

  return (
    <main  className="flex flex-col w-full h-full justify-center items-center">
        <h1 className="w-screen h-auto text-center block m-14 font-bold text-2xl">Product Details</h1>
        <div className='md:ml-10 flex place-self-start'>
            <Link to="/admin/products" className='m-5 shadow-md rounded-lg border-black-50  text-off-white md:gap-x-60 block text-2x1 font-bold bg-smooth-yellow p-2 absolute top-20'>Go Back</Link>
        </div>
        <img className='shadow-lg' src={product.image_url} />
        <div className="p-7 rounded-lg flex flex-col flex-shrink-0 shadow-md rounded-t-3xl space-y-2 border-2 border-solid bg-gray-400 bg-opacity-10 m-5  border-black">
          <span className='flex place-self-center font-bold text-1xl'>
            Product Information
            </span>
        {productDetails.map((detail, index) => (
        <span key={index} className="flex justify-between w-full p-1 space-x-10">
            <span>{detail.label}:</span>
            <span>{detail.value}</span>
        </span>
        ))}
        </div>
    </main>
  );
}

export default ProductInfo;