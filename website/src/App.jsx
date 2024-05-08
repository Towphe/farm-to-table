
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './index.css'
import Homepage from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/Signup.jsx'
import CustomerRoot from './pages/CustomerRoot.jsx'
import AdminRoot from './pages/AdminRoot.jsx'

function App(){

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
            element: <AdminRoot />,
            children: []    // place other admin reltated routes here
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;