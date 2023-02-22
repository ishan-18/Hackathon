import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from 
"@react-google-maps/api";


function Mapp() {

    const containerStyle = {
          width: "100%",
          height: "400px"
        };
        
    const center = {
        lat: 32.313268,
        lng: 35.022895
    };
    
    const findLocation = () => {

        const url = 'http://<Your IP Here>/post?Lat=19.704656&Long=74.248489&date=2022-07-01&end_dt=2022-07-30'; // Replace with your desired endpoint // Replace with your desired data

        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type of the request
        }, // Convert the data to JSON format
        })
        .then(response => response.json()) // Convert the response to JSON format
        .then(data => console.log(data)) // Log the response data to the console
        .catch(error => console.error(error));
            }
    
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState(null);
    const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDWh2tZNTZKRJQQIs6pqspqEiX7f8mxl08"
    });

    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log("Latitude:", lat, "Longitude:", lng);
        setPosition({ lat, lng });
    };

    const onLoad = (map) => {
    setMap(map);
    };

  return isLoaded ? (
    <div>
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={handleMapClick}
          onLoad={onLoad}>
          {position && <Marker position={position} />}
      </GoogleMap>
      <button onClick={findLocation}>
        Start Analysis 
      </button>
    </div>
  ) : null;
}

export default Mapp
