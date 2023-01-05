import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
    } from '@react-google-maps/api'
    
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

const Maps = (props) =>{

    const originRef = { lat: props.originLat, lng: props.originLng }
    const destinationRef = { lat: props.destinationLat, lng: props.destinationLng }

    const center = { lat: 38.736946, lng: -9.142685 }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAxxFGo_2SKG4LX_FNa0VamPmWp-lXFpxo"
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)

    if (!isLoaded) {
        return <h4>Loading...</h4>
    }

    if (isLoaded) {
        console.log("loaded")
        console.log(originRef)
        console.log(destinationRef)
    }


    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
        origin: originRef,
        destination: destinationRef,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        console.log(results)
    }


    return isLoaded ? (
        
        <div>
            <Button onClick={calculateRoute} variant="primary" type="submit" className="[ button ]">
                <div className="buttonText">
                    Best Route from Current Position
                </div>
            </Button>
            <div style={{ height: "400px", width: "100%" }}>
                <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
                >
                <Marker position={center} />
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
                </GoogleMap>
            </div>
        </div>
        ) : <><h4>Error loading maps</h4></>      
    
}

export default Maps