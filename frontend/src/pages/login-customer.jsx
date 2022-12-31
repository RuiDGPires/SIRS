import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function LoginCustomer() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    const loginCustomer = (event) => {
        console.log(event.target[0].value);
        // TODO: Call server
        navigate("/customer/" + event.target[0].value);
    }

    return (
        <>
            <div id="container">

            <a button className="customer" onClick={home}>
                Back
            </a>

            <h1>Login as a Customer</h1>

            <Form onSubmit={loginCustomer} className="form">
                <Form.Group className="[ mb-3 ] [ nm-input ]">
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Button variant="primary" type="submit" className="[ button ]">
                    <div className="buttonText">
                        Submit
                    </div>
                </Button>
            </Form>

            <h2>TODO: Cena da One time Password</h2>

            </div>      
        </>

    );
}

export default LoginCustomer;