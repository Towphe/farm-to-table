import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/Shopping-Cart`)
            .then(response => {
                const fetchedProducts = response.data.products;

                // Create a map to store products with their quantities and total prices
                const productsMap = new Map();

                // Update the map with fetched products
                fetchedProducts.forEach(product => {
                    const productName = product.productName;
                    const totalPrice = product.price * product.quantity;

                    if (productsMap.has(productName)) {
                        // If product already exists in the map, update its quantity and total price
                        const existingProduct = productsMap.get(productName);
                        const updatedQuantity = existingProduct.quantity + product.quantity;
                        const updatedTotalPrice = existingProduct.totalPrice + totalPrice;
                        productsMap.set(productName, { ...existingProduct, quantity: updatedQuantity, totalPrice: updatedTotalPrice });
                    } else {
                        // If product does not exist in the map, add it with quantity and total price
                        productsMap.set(productName, { ...product, quantity: product.quantity, totalPrice });
                    }
                });

                // Convert map values back to an array of products
                const updatedProducts = Array.from(productsMap.values());

                // Update the state with updated products
                setProducts(updatedProducts);
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, []);

    const handleDelete = async (productName) => {
        try {
            await axios.delete(`http://localhost:3000/api/Shopping-Cart?productName=${productName}`);
            // Refetch products after deletion
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <main className="relative w-full h-full overflow-x-hidden gap-6 mt-10">
            <h1 className="w-screen h-auto text-center absolute top-4 block m-4 font-bold text-3xl">Shopping Cart</h1>
            <div className="w-screen h-auto flex flex-shrink-0 flex-col items-center gap-6 md:flex-col justify-center mt-24">
                {products.map((product) => (
                    <div key={product._id} className="w-1/2 sm:w-2/5 md:w-1/4 lg:w-1/5 flex flex-col flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-3">
                        {/* <img src={product.image_url} className="w-11/12" alt={product.name} /> */}
                        <div className="flex justify-between w-full p-2">
                            <span className="space-x-3">
                                <Link to={`/products/${product._id}`}>{product.productName}</Link>
                                <span className="text-gray-600 text-opacity-60 text-sm">{product.quantity}kg</span>
                            </span>
                            <span className="flex flex-row">P {product.totalPrice}</span>
                        </div>
                        <span>
                            <button onClick={() => handleDelete(product.productName)} className="text-red-500">Delete</button>
                        </span>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default ShoppingCart;