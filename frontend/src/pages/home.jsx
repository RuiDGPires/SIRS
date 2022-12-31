import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const logincustomer = () => {
        navigate("/logincustomer");
    }

    const loginemployee = () => {
        navigate("/loginemployee");
    }


    return (
        <div className="background">
            <div className="title">
                <h1>Transportation & Distribution: Lemon</h1>
            </div>

            <a class="customer" >
                <button className="customer" onClick={logincustomer}>
                    Login as a Customer
                </button>
            </a>

            <br/>
            
            <a class="employee" >
                <button className="employee" onClick={loginemployee}>
                    Login as a Employee
                </button>
            </a>

            <p class="total-bikes">
                Total of 20000 bikes all around Portugal
            </p>
        </div>
    );
}

export default Home;