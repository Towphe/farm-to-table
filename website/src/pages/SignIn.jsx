import { useState } from "react";
import axios from "axios";
import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";
import Cookies from 'js-cookie';

function SignIn(){
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [missingEmail, setEmailAsMissing] = useState(false);
    const [missingPassword, setPasswordAsMissing] = useState(false);
    const [invalidCredentials, setCredentialsAsInvalid] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setLoginData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const login = async () =>{
        // set false by default
        setEmailAsMissing(false);
        setPasswordAsMissing(false);
        setCredentialsAsInvalid(false);

        // handle login here
        if (loginData.email === ""){
            setEmailAsMissing(true);
        }

        if (loginData.password === ""){
            setPasswordAsMissing(true);
        }
        
        if (missingEmail || missingPassword){
            // short circuit login
            return
        }
        
        await axios.post('http://localhost:3000/api/auth/sign-in', {
            email : loginData.email,
            password : loginData.password
        }).then((response) => {
            // save token to http cookie
            Cookies.set('access_token', response.data.token);
            // redirect to home page
            window.location.href = "/";
        }).catch((err) => {
            console.log(err);
            switch (err.response.status){
                case 400:
                    // notify user of invalid credentials
                    setCredentialsAsInvalid(true);
                    break;
                default:
                    // server error (prolly)
                    // notify user
                    alert("Server error. Try contacting the website adfyfyfyufyufministrator.");   // change this later on?
                    break;
            }
        });
        
    }

    return (
            <main className="w-full h-full flex flex-col justify-center items-center">
                {/* Enter content here. Refer to Home.jsx for an example */}
                <form className="w-3/5 sm:w-2/5 md:w-4/8 lg:w-1/4 xl:w-1/5 text-lg shadow-md py-4 px-2 rounded-xl flex flex-col">
                    <h1 className="font-bold block self-center text-2xl">Sign In</h1>
                    <div>
                        <label>Email</label>
                        {missingEmail ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}
                    </div>
                    <input value={loginData.email} onChange={handleChange} className="block indent-3 mb-3" type="email" name="email" required />
                    <div>
                        <label>Password</label>
                        {missingPassword ? <span className="text-sm ml-1 text-red-500">*</span> : <></>}    
                    </div>
                    <input value={loginData.password} onChange={handleChange} className="block indent-3 mb-4" type="password" name="password" required/>
                    {invalidCredentials ? <p className="text-sm text-center text-red-500">Invalid email or password</p> : <></>}
                    <button onClick={login} className="block bg-smooth-yellow text-off-white font-semibold rounded-lg hover:opacity-75 py-1" type="button">Sign in</button>
                </form>
                <p className="block mt-4 text-md">No account yet? Signup <a href="/sign-up" className="text-dark-green font-semibold hover:opacity-75">here</a>.</p>
            </main>
    )
}

export default SignIn;