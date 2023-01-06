import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerCustomer } from "../service/service";


function RegisterCustomer() {
	
	const [secret, setSecret] = useState();

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

	useEffect(() => {
		console.log(secret);
	});

    const registerCustomerUI  = (event) => {
        const firstName = event.target[0].value;
        const lastName = event.target[1].value;
        const email = event.target[2].value;
        const username = event.target[3].value;
        console.log(firstName,lastName,email,username);
        registerCustomer(firstName, lastName, email, username)
		.then(data => data.json)
		.then(data => {
			setSecret(data.secret);
	});
        //TODO: criar entry
        //IF:user entry success
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
                    <Form.Control type="text" placeholder="First Name" id="firstName"/>
                </Form.Group>

                <Form.Group>Insert Last Name 
                    <Form.Control type="text" placeholder="Last Name" id="lastName"/>
                </Form.Group>

                <Form.Group>Insert E-Mail 
                    <Form.Control type="text" placeholder="Email" id="email"/>
                </Form.Group>

                <Form.Group>Insert Username
                    <Form.Control type="text" placeholder="Username" id="username"/>
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
