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

    const registerCustomer = () => {
        navigate("/register-customer");
    }

    const registerEmployee = () => {
        navigate("/register-employee");
    }

    return (
        <div className="background">
            <div className="title">
                <h1>Transportation & Distribution: Lemon</h1>
            </div>

            <a className="customer" >
                <button className="customer" onClick={registerCustomer} style={{height:50, width:200}}>
                    Register as a Customer
                </button>
            </a>

            <br/>

            <a className="customer" >
                <button className="customer" onClick={loginCustomer} style={{height:50, width:200}}>
                    Login as a Customer
                </button>
            </a>

            <br/>

            <a className="employee" >
                <button className="employee" onClick={registerEmployee} style={{height:50, width:200}}>
                    Register as an Employee
                </button>
            </a>

            <br/>

            <a className="employee" >
                <button className="employee" onClick={loginEmployee} style={{height:50, width:200}}>
                    Login as an Employee
                </button>
            </a>

            <br/>

        </div>
    );
}

export default Home;