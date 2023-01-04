import React from 'react';
  
const ListBikes = (props) => {
  return (
    <div>
      <div>Bike ID: {props.bikeID}</div>
      <div>Wrongly parked at location:</div>
      <div>Latitude: {props.latitude}</div>
      <div>Longitude: {props.longitude}</div>
    </div>
  );
};
  
export default ListBikes;