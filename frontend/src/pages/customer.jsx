import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListBikes from '../components/listbikes';
import Button from 'react-bootstrap/Button';

function Customer() {

    //const { username } = useParams();
    const navigate = useNavigate();

    const username = 'johndoe'

    const [bikes, setBikes] = useState([
        {
            bikeID: 'b03',
            latitude: '38.754255',
            longitude: '-9.187130',
        },
        {
            bikeID: 'b04',
            latitude: '38.710411',
            longitude: '-9.146640',
        },
    ]);

    const home = () => {
        navigate("/");
    }

    //TODO: handle submit get user geolocation and suggest best route to location of selected bike

    return (

        <div id="container">

            <a button onClick={home}>
                Back
            </a>

            <h1>Hi Customer</h1>

            <h2> { username }</h2>

            <h4>Available Bikes</h4>
        
            {bikes.map((Bikes, index) => {
                return (
                <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '200px',
                    margin: '20px',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer',
                    }}
                    key={index}>
                    <ListBikes key={index} bikeID={Bikes.bikeID} 
                    latitude={Bikes.latitude}
                    longitude={Bikes.longitude}
                    />

                    <Button /*onClick={()=>handleSubmit()}*/ variant="primary" type="submit" className="[ button ]" data-inline="true">
                        <div className="buttonText">
                            Pay and Unlock Bike
                        </div>
                    </Button>

                </div>
                );
            })}
        </div> 

    );
}

export default Customer;