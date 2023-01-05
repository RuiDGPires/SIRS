import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListBikes from '../components/listbikes';
import Button from 'react-bootstrap/Button';

function Employee() {
    
    const navigate = useNavigate();

    const username = 'johndoe'
    //const { username } = useParams();

    const [currLocation, setCurrLocation] = useState({});

    useEffect(() => {
        getLocation();
      }, []);

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

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            setCurrLocation({ latitude, longitude });
        });
    };

    //TODO: handle submit get user geolocation and suggest best route to location of selected bike

    return (

        <div id="container">

            <a button className="employee" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Hi Employee { username }</h2>
            <h6>Current position: latitude { currLocation.latitude } and longitude { currLocation.longitude }</h6>

            <h4>Wrongly Parked Bikes</h4>
        
            {bikes.map((Bikes, index) => {
                return (
                <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    marginTop: '20px',
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