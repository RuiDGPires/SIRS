import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ListBikes from '../components/listbikes';
import Button from 'react-bootstrap/Button';
import Maps from '../components/maps';

function Employee() {
    
    const navigate = useNavigate();

    const { username } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("token"))

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

    const deleteEmployee  = () => {
        //TODO: delete employee
        //if success: return to home page
        //navigate("/");
    }

    const editEmployee  = () => {
        navigate("/edit-employee/" +  username );
    }
    return (

        <div id="container">

            <a button className="employee" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Hi Employee { username }</h2>
            <h6>Current position: latitude { currLocation.latitude } and longitude { currLocation.longitude }</h6>

            <button className="employee" onClick={deleteEmployee} style={{height:50, width:200}}>
                Delete Account
            </button>

            <button className="employee" onClick={editEmployee} style={{height:50, width:200}}>
                Edit Account Details
            </button>

            <h4>Wrongly Parked Bikes</h4>
        
            {bikes.map((Bikes, index) => {
                return (
                <div
                    style={{
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
                    <Maps   originLat={currLocation.latitude} 
                            originLng={currLocation.longitude} 
                            destinationLat={parseFloat(Bikes.latitude)} 
                            destinationLng={parseFloat(Bikes.longitude)} />
                </div>
                );
            })}
        </div> 

    );
}

export default Employee;