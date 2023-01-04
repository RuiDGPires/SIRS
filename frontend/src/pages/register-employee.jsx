import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function RegisterEmployee() {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username,setUsername] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "username"){
            setUsername(value);
        }

    }

    const handleSubmit  = () => {
        console.log(firstName,lastName,email,username);
        //TODO: criar entry
        //IF:user entry success
        navigate("/employee/:" + username);
        //ELSE
        //<h1>400: error creating new user employee</h1>
    }

    return(

        <div id="container">

            <a button className="customer" onClick={home}>
                Back
        
            </a>

            <h1>Register as an Employee</h1>

            <Form onChange={(e) => handleInputChange(e)} className="firstname">
                <Form.Group className="[ mb-3 ] [ nm-input ]">Insert First Name 
                    <Form.Control type="text" placeholder="First Name" id="firstName" value={firstName}/>
                </Form.Group>
            </Form>

            <Form onChange={(e) => handleInputChange(e)} className="lastname">
                <Form.Group className="[ mb-3 ] [ nm-input ]">Insert Last Name 
                    <Form.Control type="text" placeholder="Last Name" id="lastName" value={lastName}/>
                </Form.Group>
            </Form>

            <Form onChange={(e) => handleInputChange(e)} className="email">
                <Form.Group className="[ mb-3 ] [ nm-input ]">Insert E-Mail 
                    <Form.Control type="text" placeholder="Email" id="email" value={email}/>
                </Form.Group>
            </Form>

            <Form onChange={(e) => handleInputChange(e)} className="username">
                <Form.Group className="[ mb-3 ] [ nm-input ]">Insert Username
                    <Form.Control type="text" placeholder="Username" id="username" value={username}/>
                </Form.Group>
            </Form>


            <Button onClick={()=>handleSubmit()} variant="primary" type="submit" className="[ button ]">
                <div className="buttonText">
                    Register as an Employee
                </div>
            </Button>

        </div>
       
    );
}

export default RegisterEmployee;