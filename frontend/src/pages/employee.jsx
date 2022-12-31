import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function Employee() {

    const { username } = useParams();
    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }


    return (
        <>
            <div id="container">

            <a button onClick={home}>
                Back
            </a>

            <h1>Hi Employee</h1>

            <h2> { username }</h2>

            </div>      
        </>

    );
}

export default Employee;