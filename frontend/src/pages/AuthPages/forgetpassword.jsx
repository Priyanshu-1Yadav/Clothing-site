import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useVariableContext } from '../../context/VariableContext';
import './auth.css';

const ForgetPassword = () => {

    const {host} = useVariableContext()
    const [email,setEmail] = useState("");
    const [error,setError] = useState(null);
    

    const handlesubmit = async () => {
        // console.log('submit');
        const response = await fetch(`${host}/password/forgetpassword`,{
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email
            })
        })

        const data = await response.json();
        // console.log(data);
        
        if(data && data.message){
            setError(data.message)
            if(data.message === "User not found.")
                return;
        }
    }

    return (
        <div className="parent-container">
            <div className="auth-container">
                <h1>Forgot Password</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail  (e.target.value)} type="email" id="email" name="email" placeholder="Your Email" required />
                    </div>

                    {error? <p className='err-message'>{error}</p> :  <></>}

                    <button onClick={()=>handlesubmit()} type="submit" className="submit-button">Send Reset Link</button>
                </form>
                <p className="auth-footer">
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPassword;
