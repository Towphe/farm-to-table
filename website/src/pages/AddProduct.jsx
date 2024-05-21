import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    const [details, setDetails] = useState({
        "description": "",
        "name": "",
        "price": 0,
        "quantity": 0,
        "type": "meat",
        "unit": "kg",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/admin/AddProduct`)
    })

   const submitProduct = async () => {
        await axios.post(`http://localhost:3000/api/product`, {
            name: details.name,
            description: details.description,
            type: details.type,
            price: details.price,
            quantity: details.quantity,
            unit: details.unit 
        });
   }
}
export default AddProduct;