
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './index.css'
import Homepage from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/Signup.jsx'
import CustomerRoot from './pages/CustomerRoot.jsx'
import AdminRoot from './pages/AdminRoot.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProducts from './pages/EditProduct.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductInfo from './pages/ProductInfo.jsx'
import ShoppingCart from './pages/ShoppingCart.jsx'
import ProductList from './pages/ProductList.jsx'
import {ProtectedRoute} from './components/common/ProtectedRoute.jsx'
import AuthProvider from "./components/common/AuthProvider.jsx";
import axios from 'axios'
import Reports from './pages/Reports.jsx'
import AdminHomePage from './pages/AdminHomepage.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <CustomerRoot />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'products/:code',
                element: <ProductDetail/>
            },
            {
                path: 'shopping-cart',
                element: <ShoppingCart/>
            }
        ]
    },
    {
        path: '/admin',
        element: <ProtectedRoute />,
        children: [
            {
                path: '',
                element: <AdminRoot />,
                children: [
                    {
                        path: '',
                        element: <AdminHomePage />
                    },
                    {
                        path: 'products',
                        element: <ProductList/>
                    },
                    {
                        path: 'products/:code',
                        element: <ProductInfo/>
                    }
                    ,
                    {
                        path: 'reports',
                        element: <Reports />
                    }
                    ,
                    {
                        path: 'add-product',
                        element: <AddProduct/>
                    }
                    ,
                    {
                        path: 'edit-product/:id',
                        element: <EditProducts/>
                    }
                ]
            },

        ]    // place other admin reltated routes here
    }
]);

function App(){
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.post("http://localhost:3000/api/auth/refresh", {}, {withCredentials:true});
    }, []);

    return (
        <>
            {/* <RouterProvider router={router} /> */}
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    )
}

export default App;