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
    }

    return(

        <div id="container">

            <a button className="customer" onClick={home}>
                    Back
        }
            </a>


            <div className="form">

                <div className="form-body">

                    <div className="username">
                        <label className="[ mb-3 ] [ nm-input ]" for="firstName">First Name </label>
                        <input className="[ mb-3 ] [ nm-input ]" type="text" name="" id="firstName" value={firstName} onChange = {(e) => handleInputChange(e)} placeholder="First Name"/>
                    </div>

                    <div className="lastname">
                        <label className="[ mb-3 ] [ nm-input ]" for="lastName">Last Name </label>
                        <input className="[ mb-3 ] [ nm-input ]" type="text" name="" id="lastName" value={lastName} onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                    </div>

                    <div className="email">
                        <label className="[ mb-3 ] [ nm-input ]" for="email">Email </label>
                        <input className="[ mb-3 ] [ nm-input ]" type="email" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    </div>

                    <div className="username">
                        <label className="[ mb-3 ] [ nm-input ]" for="username">Username </label>
                        <input className="[ mb-3 ] [ nm-input ]" type="username"  id="username" value={username} onChange = {(e) => handleInputChange(e)} placeholder="Username"/>
                    </div>

                </div>

                <div class="footer">
                    <button variant="primary" onClick={()=>handleSubmit()} type="submit" className="[ button ]">Register as an Employee</button>
                </div>

            </div>

        </div>
       
    );
}

export default RegisterEmployee;