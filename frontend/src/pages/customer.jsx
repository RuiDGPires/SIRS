import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ListBikes from '../components/listbikes';
import Button from 'react-bootstrap/Button';
import { listBikes } from "../service/service";

function Customer() {
    
    const navigate = useNavigate();

    const { username } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState(searchParams.get("token"));

    const [currLocation, setCurrLocation] = useState({});

    useEffect(() => {
        getLocation();

        listBikes(token)
            .then(data => data.json())
            .then(data => {
                setBikes(data);
            })
    }, []);

    const [bikes, setBikes] = useState([]);

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

    const unlockBike  = () => {
        //TODO: unlock bike
        //if success: update list of bikes and reload page
    }

    const deleteCustomer  = () => {
        //TODO: delete customer
        //if success: return to home page
        //navigate("/");
    }

    const editCustomer  = () => {
        navigate("/edit-customer/" +  username );
    }

    return (

        <div id="container">

            <a button className="customer" onClick={home} style = {{cursor: 'pointer'}}>
                Back
            </a>

            <h2>Hi Customer { username }</h2>
            <h6>Current position: latitude { currLocation.latitude } and longitude { currLocation.longitude }</h6>

            <button className="customer" onClick={deleteCustomer} style={{height:50, width:200}}>
                Delete Account
            </button>

            <button className="customer" onClick={editCustomer} style={{height:50, width:200}}>
                Edit Account Details
            </button>

            <h4>Available Bikes</h4>

        
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
                    <ListBikes 
                        key={index} 
                        bikeID={Bikes.id} 
                        latitude={Bikes.latitude}
                        longitude={Bikes.longitude}
                        locked={Bikes.locked}
                    />

                    <Button onClick={unlockBike} variant="primary" type="submit" className="[ button ]" data-inline="true">
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