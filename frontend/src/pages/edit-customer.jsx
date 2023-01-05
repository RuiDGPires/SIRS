import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function EditCustomer() {

    const navigate = useNavigate();

    const { username } = useParams();

    const home = () => {
        navigate("/");
    }

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

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

    }

    const editCustomer  = () => {
        //TODO: editar entry
        //IF:user entry success
        navigate("/customer/" +  username);
        //ELSE
        //<h1>400: error editing new user customer</h1>
    }

    return(

        <div id="container">

            <a button className="customer" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Edit Customer {username}</h2>

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

            <Button onClick={editCustomer} variant="primary" type="submit" className="[ button ]">
                <div className="buttonText">
                    Edit Account
                </div>
            </Button>

        </div>
       
    );
}

export default EditCustomer;