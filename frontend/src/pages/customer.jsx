import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function Customer() {

    const { username } = useParams();
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

            <h1>Hi Customer</h1>

            <h2> { username }</h2>

            </div>      
        </>

    );
}

export default Customer;