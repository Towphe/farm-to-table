import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


function EditProducts() {
  const {id} = useParams();
  const [details, setDetails] = useState({
      "description": "",
      "name": "",
      "price": 0,
      "quantity": 0,
      "type": "",
      "unit": "",
      "image_url": "",
      "_id": ""
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
      axios.get(`http://localhost:3000/api/admin/edit-product/${id}`)
      .then(body => {
          setDetails(body.data);
        } )
        .catch(error => console.error('Error fetching product details:', error));
    }, []);

  const handleChange = (e) => {
      const {name, value} = e.target;
      setDetails({
          ...details,
          [name]: value
      })
  }

  const modifyProduct = async (e) => {
      e.preventDefault();
      if (details.price < 0 || quantity.price < 0) {
          alert('Price and quantity must not have a negative value.')
          return;
      }
      try {
          await axios.put(`http://localhost:3000/api/product/${id}`, details);
          setMessage('Product updated successfully!');
          history.push('/product-list'); // Redirect to the product list page after update
      } catch (error) {
          console.error('Error updating product:', error);
          setMessage('Error updating product. Please try again.');
      }
  }


  return(
<main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
          <h1 className="w-screen h-auto text-center block p-4 font-bold text-2xl">Edit Product</h1>
          <div className="w-screen h-auto flex flex-col items-center gap-4 md:flex-col justify-center mt-6">
              <form onSubmit={modifyProduct} className="w-full max-w-lg p-4 shadow-md rounded-md bg-white">
                  <div className="mb-1 p-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Name
                      </label>
                      <input
                          type="text"
                          name="name"
                          value={details.name}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 px-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Description
                      </label>
                      <input
                          type="text"
                          name="description"
                          value={details.description}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 p-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                          Type
                      </label>
                      <input
                          type="text"
                          name="type"
                          value={details.type}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 px-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                          Price
                      </label>
                      <input
                          type="number"
                          name="price"
                          value={details.price}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 p-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                          Quantity
                      </label>
                      <input
                          type="number"
                          name="quantity"
                          value={details.quantity}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 px-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                          Unit of Measurement
                      </label>
                      <input
                          type="text"
                          name="unit"
                          value={details.unit}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="mb-1 p-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">
                          Image URL of Product
                      </label>
                      <input
                          type="text"
                          name="image_url"
                          value={details.image_url}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>
                  <div className="flex justify-center">
                      <button type="submit" className="bg-yellow-500 rounded-full hover:bg-blue-700 text-off-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                          Update Product
                      </button>
                  </div>
              </form>
          </div>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </main>
  )
}

export default EditProducts;