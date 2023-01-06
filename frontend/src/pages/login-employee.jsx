import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginEmployee } from "../service/service";

function LoginEmployee() {

    const [submitted, setSubmitted] = useState(false);
    const [userName, setUserName] = useState();
    const [otp, setOTP] = useState();

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    useEffect(() => {
        if (submitted) {
            loginEmployee(userName, otp)
                .then(data => data.json())
                .then(data => {
                    setSubmitted(false);
                    // TODO: get token
                    console.log(data);
                    navigate("/employee/" + userName);
                })
                .catch(error => {
                    setSubmitted(false);
                    console.log(error);
                });
        }
    });

    const loginEmployeeUI = (event) => {
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
                
                <h1>Login as an Employee</h1>
                
                <Form onSubmit={loginEmployeeUI} className="form">
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

export default LoginEmployee;
