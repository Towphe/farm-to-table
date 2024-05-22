import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        "description": "",
        "name": "",
        "price": 0,
        "quantity": 0,
        "type": "",
        "unit": ""
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        });
    };
    
    const submitProduct = async (e) => {
        e.preventDefault();

        if (details.price < 0 || details.quantity < 0) {
            alert('Price and quantity must be non-negative.');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/api/admin/product/`, {
                "name": details.name,
                "description": details.description,
                "price": parseFloat(details.price),
                "quantity": details.quantity,
                "type": details.type,
                "unit": details.unit
            }, {withCredentials: true})
                .then(async (res) => {
                    console.log(res);
                    // handle image upload
                    const productId = res.data.productId;
                    const image = document.getElementById("image-file");
                    let data = new FormData();
                    data.append(`image`, image.files[0])
                    await axios.patch(`http://localhost:3000/api/admin/product/${productId}/image`, data, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    })
                    .then(res => navigate("/admin/products"));
                });
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Error adding product. Please try again.');
        }
    }

   return(
        <main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
            <h1 className="w-screen h-auto text-center block p-4 font-bold text-2xl">Add New Product</h1>
            <div className="w-screen h-auto flex flex-col items-center gap-4 md:flex-col justify-center mt-6">
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
                            name="type"
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
                <div className="mb-1 px-6">
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
                <div className="mb-1 p-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Image URL of Product
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image-file"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                </div>
                < div className="flex justify-center">
                <button type= "submit" className="flex bg-yellow-500 rounded-full hover:bg-green-700 text-off-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Product
                </button>
                </div>
                </form>
            </div>
             {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </main>
   )
}
export default AddProduct;