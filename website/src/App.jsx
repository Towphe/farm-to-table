
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
import Products from './pages/Products.jsx'
import OrdersList from './pages/OrdersList.jsx'
import CheckoutView from './pages/CheckoutView.jsx'
import OrderSuccess from './pages/SuccessView.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import {ProtectedRoute} from './components/common/ProtectedRoute.jsx'
import AuthProvider from "./components/common/AuthProvider.jsx";
import axios from 'axios'


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
                path: 'orders',
                element: <OrdersList/>
            },
            {
                path: 'orders/:code',
                element: <OrderDetail/>
            },
            {
                path: 'checkout',
                element: <CheckoutView/>
            },
            {
                path: 'success',
                element: <OrderSuccess/>
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
                        element: <h1>Admin placeholder 2</h1>
                    }
                ]
            }
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