import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginCustomer } from "../service/service";


function LoginCustomer() {

    const [submitted, setSubmitted] = useState(false);
    const [userName, setUserName] = useState();
    const [otp, setOTP] = useState();

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    useEffect(() => {
        if (submitted) {
            loginCustomer(userName, otp)
                .then(data => data.json())
                .then(data => {
                    setSubmitted(false);
                    console.log(data);
                    navigate("/customer/" + userName + "?token=" + data.token);
                })
                .catch(error => {
                    setSubmitted(false);
                    console.log(error);
                });
        }
    });

    const loginCustomerUI = (event) => {
        event.preventDefault();
        const _userName = event.target[0].value;
        const _otp = event.target[1].value;

        console.log(_userName, _otp);

        setSubmitted(true);
        setUserName(_userName);
        setOTP(_otp);
    }

    return (
        <>
            <div id="container">
                <a button className="customer" onClick={home} style = {{cursor: 'pointer'}}>
                    Back
                </a>

                <h2>Login as a Customer</h2>

                <Form onSubmit={loginCustomerUI} className="form">
                    <Form.Group>Insert Username
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Group>
                        Insert One Time Password (Google Authenticator)
                        <Form.Control type="number" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="[ button ]">
                        <div className="buttonText">
                            Submit
                        </div>
                    </Button>
                </Form>
            </div>      
        </>

    );
}

export default LoginCustomer;