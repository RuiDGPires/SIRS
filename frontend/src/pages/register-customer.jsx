import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerCustomer } from "../service/service";
import QRCode from "react-qr-code";


function RegisterCustomer() {
	
	const [secret, setSecret] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

	useEffect(() => {
		console.log(secret);
        if (submitted) {
            registerCustomer(firstName, lastName, email, userName)
            .then(data => data.json())
            .then(data => {
                setSecret(data.secret);
                setSuccess(true);
                setSubmitted(false);
            })
            .catch(error => {
                setSecret(null);
                setSuccess(false);
                setSubmitted(false);
            });
        }
	});

    const registerCustomerUI  = (event) => {
        event.preventDefault();
        const _firstName = event.target[0].value;
        const _lastName = event.target[1].value;
        const _email = event.target[2].value;
        const _username = event.target[3].value;
        console.log(_firstName,_lastName,_email,_username);
        setFirstName(_firstName);
        setLastName(_lastName);
        setEmail(_email);
        setUserName(_username);
        setSubmitted(true);
        setSuccess(null);
	}

	function Success(){
		if (success == true) {
			return (
				<QRCode value={"otpauth://totp/" + userName + "?secret=" + secret} />
			);
		} else if (success == false) {
			return (<h1>FAILURE</h1>);
		}

		return (<></>);
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

            <Success />
        </div>
       
    );
}

export default RegisterCustomer;
