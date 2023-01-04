import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListBikes from '../components/listbikes';
import Button from 'react-bootstrap/Button';

function Employee() {

    //const { username } = useParams();
    const navigate = useNavigate();

    const username = 'johndoe'

    const [bikes, setBikes] = useState([
        {
            bikeID: 'b01',
            latitude: '38.754240',
            longitude: '-9.187130',
        },
        {
            bikeID: 'b02',
            latitude: '38.710411',
            longitude: '-9.146660',
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

            <h2>Hi Employee</h2>

            <h4> { username }</h4>

            <h4>Wrongly parked bikes</h4>
        
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
                            Get Directions
                        </div>
                    </Button>

                </div>
                );
            })}
        </div> 

    );
}

export default Employee;