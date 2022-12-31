import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function LoginCustomer() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    return (
        <>
            <div id="container">

            <a button className="customer" onClick={home}>
                Back
            </a>

            <h1>Login as a Customer</h1>

            <input type="text" id="customer_user"/>
            <button onclick="login_customer()">Submit</button>

            <h2>TODO: Cena da One time Password</h2>

            </div>      
        </>

    );
}

export default LoginCustomer;