
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './index.css'
import Homepage from './pages/customer/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/Signup.jsx'
import CustomerRoot from './pages/customer/CustomerRoot.jsx'
import AdminRoot from './pages/admin/AdminRoot.jsx'
import UserList from './pages/admin/UserList.jsx'
import UserDetails from './pages/admin/UserDetails.jsx'
import AddProduct from './pages/admin/AddProduct.jsx'
import EditProducts from './pages/admin/EditProduct.jsx'
import Products from './pages/customer/Products.jsx'
import ProductDetail from './pages/customer/ProductDetail.jsx'
import ProductInfo from './pages/admin/ProductInfo.jsx'
import ShoppingCart from './pages/customer/ShoppingCart.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import {ProtectedRoute} from './components/common/ProtectedRoute.jsx'
import AuthProvider from "./components/common/AuthProvider.jsx";
import axios from 'axios'
import Reports from './pages/admin/Reports.jsx'
import AdminHomePage from './pages/admin/AdminHomepage.jsx'
import CheckoutView from './pages/customer/CheckoutView.jsx'
import OrderSuccess from './pages/customer/SuccessView.jsx'
import OrdersList from './pages/customer/OrdersList.jsx'
import AdminOrderList from './pages/admin/AdminOrderList.jsx'
import OrderInfo from './pages/customer/OrderInfo.jsx'
import AdminOrderInfo from './pages/admin/AdminOrderInfo.jsx'

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
            },
            {
                path: 'orders',
                element: <OrdersList/>
            },
            {
                path: 'orders/:orderId',
                element: <OrderInfo />
            },
            {
                path: 'checkout-view',
                element: <CheckoutView/>
            },
            {
                path: 'success',
                element: <OrderSuccess/>
            },
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
                    },
                    {
                        path: 'orders',
                        element: <AdminOrderList/>
                    },
                    {
                        path: 'orders/:orderId',
                        element: <AdminOrderInfo />
                    },
                    {
                      path: 'users',
                      element: <UserList />
                    },
                    {
                      path: 'users/:id',
                      element: <UserDetails />
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