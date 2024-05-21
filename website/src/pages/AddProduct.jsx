import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    const [details, setDetails] = useState({
        "description": "",
        "name": "",
        "price": "",
        "quantity": "",
        "type": "",
        "unit": "",
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        });
    };
    
   const submitProduct = async () => {
    if (price < 0 || quantity < 0) {
        alert('Price and quantity must be non-negative.');
        return;
      }
        await axios.post(`http://localhost:3000/api/product`, {
            name: details.name,
            description: details.description,
            type: details.type,
            price: details.price,
            quantity: details.quantity,
            unit: details.unit 
        });
        setMessage('Product added successfully!');
   }

   return(
        <main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
            <h1 className="w-screen h-auto text-center block p-10 font-bold text-2xl">Add New Product</h1>
            <div className="w-screen h-auto flex flex-col items-center gap-6 md:flex-col justify-center mt-6">
                <form onSubmit={submitProduct} className="w-full max-w-lg p-4 shadow-md rounded-md bg-white">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Type
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={details.type}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                </div>
                <div className="mb-1 px-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                <div className="mb-1 p-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                </form>
            </div>

        </main>
   )
}
export default AddProduct;