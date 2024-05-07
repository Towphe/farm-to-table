
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import './index.css'
import Homepage from './Home.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './Signup.jsx'

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage />} path="/" />
                <Route element={<SignIn />} path="/sign-in" />
                <Route element={<SignUp />} path="/sign-up" />
            </Routes>
        </BrowserRouter>
    )
}

export default App;