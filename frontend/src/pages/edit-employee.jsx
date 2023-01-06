import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateEmployeeCall } from "../service/service";


function EditEmployee() {

    const navigate = useNavigate();

    const { username } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState(searchParams.get("token"));

    const home = () => {
        navigate("/");
    }

    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState(null);

    const editEmployeeUI  = (event) => {
        event.preventDefault();
        const _email = event.target[0].value;
        setEmail(_email);
        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted) {
            updateEmployeeCall(username, token, email)
            .then(data => data.json())
            .then(data => {
                setSubmitted(false);
            })
            .catch(error => {
                setSubmitted(false);
            });
        }
    })

    return(

        <div id="container">

            <a button className="customer" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Edit Employee {username}</h2>

            <Form onSubmit={editEmployeeUI}>
                <Form.Group>Insert E-Mail 
                    <Form.Control type="text" placeholder="Email" id="email"/>
                </Form.Group>

                <Button variant="primary" type="submit" className="[ button ]">
                    <div className="buttonText">
                        Update email
                    </div>
                </Button>
            </Form>
        </div>
       
    );
}

export default EditEmployee;