import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/Shopping-Cart`)
            .then(response => {
                const fetchedProducts = response.data.products;

                const productsMap = new Map();

                fetchedProducts.forEach(product => {
                    const productName = product.productName;
                    const totalPrice = product.price * product.quantity;

                    if (productsMap.has(productName)) {
                        const existingProduct = productsMap.get(productName);
                        const updatedQuantity = existingProduct.quantity + product.quantity;
                        const updatedTotalPrice = existingProduct.totalPrice + totalPrice;
                        productsMap.set(productName, { ...existingProduct, quantity: updatedQuantity, totalPrice: updatedTotalPrice });
                    } else {
                        productsMap.set(productName, { ...product, quantity: product.quantity, totalPrice });
                    }
                });

                const updatedProducts = Array.from(productsMap.values());
                setProducts(updatedProducts);

                // Calculate total
                const total = updatedProducts.reduce((acc, product) => acc + product.totalPrice, 0);
                setTotal(total);
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
                    <div key={product._id} className="flex flex-col text-m flex-shrink-0 items-center justify-center shadow-md rounded-t-md border-black-50 bg-opacity-40 bg-green-300 p-3">
                        <div className="flex justify-between w-full p-2 space-x-3">
                            <span className="space-x-3">
                                <Link to={`/products/${product._id}`}>{product.productName}</Link>
                                <span className="text-gray-600 text-opacity-60 text-sm">{product.quantity}kg</span>
                            </span>
                            <span className="flex flex-row">P{product.totalPrice}</span>
                            <span>
                                <button onClick={() => handleDelete(product.productName)} className="flex items-center gap-2 text-red-500">
                                    <img src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-trash-icon-png-image_865253.jpg" alt="Delete" style={{ width: '20px', height: '20px' }} />
                                </button>
                            </span>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between space-x-40 text-2xl font-bold">
                    <span>Total:</span>
                    <span>P{total}</span>
                </div>
                <button className="flex justify-center items-center w-80 p-3 rounded-full shadow-sm bg-green-700 text-off-white text-2xl font-bold"> Checkout</button>
            </div>
        </main>
    );
}

export default ShoppingCart;