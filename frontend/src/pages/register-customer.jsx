import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerCustomer } from "../service/service";


function RegisterCustomer() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    const registerCustomerUI  = (event) => {
        let firstName = event.target[0].value;
        let lastName = event.target[1].value;
        let email = event.target[2].value;
        let username = event.target[3].value;
        console.log(firstName,lastName,email,username);
        registerCustomer(firstName, lastName, email, username);
        //TODO: criar entry
        //IF:user entry success
        navigate("/customer/" + username);
        //ELSE
        //<h1>400: error creating new user employee</h1>
    }

    return(

        <div id="container">

            <a button className="customer" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Register as a Customer</h2>

            <Form onSubmit={registerCustomerUI} className="firstname">
                <Form.Group>Insert First Name 
                    <Form.Control type="text" placeholder="First Name" id="firstName" value={firstName}/>
                </Form.Group>

                <Form.Group>Insert Last Name 
                    <Form.Control type="text" placeholder="Last Name" id="lastName" value={lastName}/>
                </Form.Group>

                <Form.Group>Insert E-Mail 
                    <Form.Control type="text" placeholder="Email" id="email" value={email}/>
                </Form.Group>

                <Form.Group>Insert Username
                    <Form.Control type="text" placeholder="Username" id="username" value={username}/>
                </Form.Group>

                <Button variant="primary" type="submit" className="[ button ]">
                    <div className="buttonText">
                        Register as a Customer
                    </div>
                </Button>
            </Form>
        </div>
       
    );
}

export default RegisterCustomer;