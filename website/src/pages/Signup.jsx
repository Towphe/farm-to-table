import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";

function SignUp(){

    const [signupData, setSignupData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [missingFirstname, setFirstnameAsMissing] = useState(false);
    const [missingLastname, setLastnameAsMissing] = useState(false);
    const [missingEmail, setEmailAsMissing] = useState(false);
    const [missingPassword, setPasswordAsMissing] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setSignupData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    /*
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        middleName: 't'
    */

    const signup = async () => {
        // set false by default
        setFirstnameAsMissing(false);
        setLastnameAsMissing(false);
        setEmailAsMissing(false);
        setPasswordAsMissing(false);

        if (signupData.firstName === ""){
            setFirstnameAsMissing(true);
        }

        if (signupData.lastName === ""){
            setLastnameAsMissing(true);
        }

        if (signupData.email === ""){
            setEmailAsMissing(true);
        }

        if (signupData.password === ""){
            setPasswordAsMissing(true);
        }

        if (missingFirstname || missingLastname || missingPassword || missingEmail){
            // short circuit sign up
            return;
        }
        
        await axios.post('http://localhost:3000/api/auth/sign-up', {
            firstName: signupData.firstName,
            middleName: signupData.middleName === '' ? null : signupData.middleName,
            lastName: signupData.lastName,
            email: signupData.email,
            password: signupData.password
        }).then((response) => {
            // save token to http cookie
            Cookies.set('access_token', response.data.token); // add refresh_token later on
            // redirect to home page
            window.location.href = "/";
        }).catch((err) => {
            console.log(err);
            switch (err.response.status){
                case 400:
                    // notify user of invalid credentials
                    console.log(err.response.detail)
                    break;
                default:
                    // server error (prolly)
                    // notify user
                    alert("Server error. Try contacting the website administrator.");   // change this later on?
                    break;
            }
        });
    }

    return (
            <main className="w-full h-full flex flex-col justify-center items-center">
                {/* Enter content here. Refer to Home.jsx for an example */}
                <form className="w-4/5 sm:w-3/5 md:w-4/8 lg:w-1/4 xl:w-1/5 text-lg shadow-md py-4 px-2 rounded-xl flex flex-col">
                    <h1 className="font-bold block self-center text-2xl">Sign Up</h1>
                    <div>
                        <label>First name</label>
                        {missingFirstname ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}
                    </div>
                    <input value={signupData.firstName} onChange={handleChange} className="block indent-3 mb-3" type="text" name="firstName"/>
                    <div>
                        <label>Middle name</label>
                    </div>
                    <input value={signupData.middleName} onChange={handleChange} className="block indent-3 mb-3" type="text" name="middleName"/>
                    <div>
                        <label>Last name</label>
                        {missingLastname ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}
                    </div>
                    <input value={signupData.lastName} onChange={handleChange} className="block indent-3 mb-3" type="text" name="lastName"/>
                    <div>
                        <label>Email</label>
                        {missingEmail ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}
                    </div>
                    <input value={signupData.email} onChange={handleChange} className="block indent-3 mb-3" type="email" name="email"/>
                    <div>
                        <label>Password</label>
                        {missingPassword ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}    
                    </div>
                    <input value={signupData.password} onChange={handleChange} className="block indent-3 mb-4" type="password" name="password"/>
                    <button onClick={signup} className="block bg-dark-green text-off-white font-semibold rounded-lg hover:opacity-75 py-1" type="button">Sign up</button>
                </form>
                <p className="block mt-4 text-md">Already have an account? Sign in <a href="/sign-in" className="text-smooth-yellow font-semibold hover:opacity-75">here</a>.</p>
            </main>
    )
}

export default SignUp;