
import React, { useState } from 'react'
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
import {useAuth} from './components/common/AuthProvider.jsx';
import {ProtectedRoute} from './components/common/ProtectedRoute.jsx'
import AuthProvider from "./components/common/AuthProvider.jsx";

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