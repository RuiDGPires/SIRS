import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const loginCustomer = () => {
        navigate("/login-customer");
    }

    const loginEmployee = () => {
        navigate("/login-employee");
    }


    return (
        <div className="background">
            <div className="title">
                <h1>Transportation & Distribution: Lemon</h1>
            </div>

            <a className="customer" >
                <button className="customer" onClick={loginCustomer}>
                    Login as a Customer
                </button>
            </a>

            <br/>
            
            <a className="employee" >
                <button className="employee" onClick={loginEmployee}>
                    Login as a Employee
                </button>
            </a>

            <ul>
                <li>Registration Employee</li>
                <li>Registration Customer</li>
                <li>Employee Page</li>
                <li>Customer Page</li>
            </ul>

            <p className="total-bikes">
                Total of 20000 bikes all around Portugal
            </p>
        </div>
    );
}

export default Home;