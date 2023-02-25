import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { TableContainer, TableCaption, Grid, Heading, Thead, Th, Tbody, Tr, Td, Table, Tfoot, Box, Center, Text, Stack, VStack, HStack, ChakraProvider, Button } from "@chakra-ui/react";
import Card from "./Card";
import SoilAnalysis from "./SoilAnalysis";

const data = {
  "Fertility": {
      "cec": {
          "cec[0 - 5cm]": 36.8,
          "cec[15 - 30cm]": 36.4,
          "cec[30 - 60cm]": 36.3,
          "cec[5 - 15cm]": 36.3,
          "unit": "cmol(c)/kg"
      },
      "clay": {
          "clay[0 - 5cm]": 42.6,
          "clay[15 - 30cm]": 41.3,
          "clay[30 - 60cm]": 40.6,
          "clay[5 - 15cm]": 42.3,
          "unit": "g/100g (%)"
      },
      "nitrogen": {
          "nitrogen[0 - 5cm]": 125,
          "nitrogen[15 - 30cm]": 81,
          "nitrogen[30 - 60cm]": 65,
          "nitrogen[5 - 15cm]": 103,
          "unit": "g/kg"
      },
      "oc": {
          "oc[0 - 5cm]": 11.7,
          "oc[15 - 30cm]": 6.4,
          "oc[30 - 60cm]": 4.9,
          "oc[5 - 15cm]": 8.7,
          "unit": "g/kg"
      },
      "ocd": {
          "ocd[0 - 5cm]": 17.9,
          "ocd[15 - 30cm]": 11.5,
          "ocd[30 - 60cm]": 8.9,
          "ocd[5 - 15cm]": 15.5,
          "unit": "kg/m³"
      },
      "ph": {
          "ph[0 - 5cm]": 7,
          "ph[15 - 30cm]": 7.1,
          "ph[30 - 60cm]": 7.4,
          "ph[5 - 15cm]": 7,
          "unit": "pH"
      },
      "predictions": {
          "fertile_prediction_count": 2,
          "infertile_prediction_count": 2,
          "majority": "Equal(50 - 50%)",
          "prediction[0 - 5cm]": "1",
          "prediction[15 - 30cm]": "1",
          "prediction[30 - 60cm]": "0",
          "prediction[60 - 100cm]": "0",
          "totalPrediction": 50
      },
      "sand": {
          "sand[0 - 5cm]": 30.4,
          "sand[15 - 30cm]": 31,
          "sand[30 - 60cm]": 31.9,
          "sand[5 - 15cm]": 30.5,
          "unit": "g/100g(%)"
      },
      "silt": {
          "silt[0 - 5cm]": 27,
          "silt[15 - 30cm]": 27.7,
          "silt[30 - 60cm]": 27.5,
          "silt[5 - 15cm]": 27.2,
          "unit": "g/100g (%)"
      }
  },
  "Parameters": [
      "19.701181359584794",
      "74.25290928045655",
      "2022-07-01",
      "2022-07-30"
  ],
  "crop": {
      "crop[0 - 5cm]": "watermelon",
      "crop[15 - 30cm]": "watermelon",
      "crop[30 - 60cm]": "blackgram",
      "crop[5 - 15cm]": "watermelon",
      "humidity": 74,
      "rain": 35.8,
      "temperature": 26
  }
}

var Fertility = data.Fertility;
var {cec, clay, nitrogen, oc, ocd, ph, predictions, sand, silt }= data.Fertility;

const layer = ['Nutrient', 'Humus', 'Top Soil', 'Eluvial Soil', 'Sub Soil', 'Metric']

function Mapp() {

    const [ sdata, setSdata ] = useState(data.Fertility);
    const [cec, setCec] = useState(data.Fertility.cec);
    const [clay, setClay] = useState(data.Fertility.clay);
    const [nitrogen, setNitrogen] = useState(data.Fertility.nitrogen)
    const [oc, setOC] = useState(data.Fertility.oc)
    const [ocd, setOCD] = useState(data.Fertility.ocd)
    const [ph, setPH] = useState(data.Fertility.ph)
    const [sand, setSand] = useState(data.Fertility.sand)
    const [slit, setSlit] = useState(data.Fertility.silt)
    const [predictions, setPredictions] = useState(data.Fertility.predictions)

    const containerStyle = {
          width: "100%",
          height: "calc(100vh)"
        };
        
    const center = {
        lat: 19.704656,
        lng: 74.248489
    };

    const displayData = (data) => {
      setIsTableVisible(!isTableVisible);
    }

    
    const findLocation = () => {
        var lat = position['lat']
        var lng = position['lng']
        // console.log('Latitude:', lat, 'Longitude:', lng); 
 
        const url = `http://172.19.3.100:5000/post?Lat=${lat}&Long=${lng}&date=2022-07-01&end_dt=2022-07-30`;// Replace with your desired endpoint // Replace with your desired data

        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Specify the content type of the request
        }, // Convert the data to JSON format
        })
        .then(response => response.json()) // Convert the response to JSON format
        .then(data => {
            setSdata(data.Fertility);
            setCec(data.Fertility.cec);
            setClay(data.Fertility.clay);
            setNitrogen(data.Fertility.nitrogen)
            setOC(data.Fertility.oc)
            setOCD(data.Fertility.ocd)
            setPH(data.Fertility.ph)
            setPredictions(data.Fertility.predictions)
            setSand(data.Fertility.sand)
            setSlit(data.Fertility.slit)

        // { {cec, clay, nitrogen, oc, ocd, ph, predictions, sand, silt } = sdata.Fertility;}
          console.log(sdata);
          setIsTableVisible(!isTableVisible);
        })
         // Log the response data to the console
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

    const [isTableVisible, setIsTableVisible] = useState(false);

  return isLoaded ? (
    <div>
      <Navbar />
      <GoogleMap 
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={handleMapClick}
          onLoad={onLoad}>
          {position && <Marker position={position}
          />}
      </GoogleMap>
      <br/>
      <Link to={'/soil-analysis'}>
      <button onClick={findLocation} style={{    
    background: "blue",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px"}}>
        Start Analysis 
      </button>
      </Link>
      {/* <TableContainer>
  <Table variant='striped' colorScheme='blue'>
    <Thead>
    <Tr>
          {layer.map((label, index) => (
            <Th key={index}>{label}</Th>
          ))}
        </Tr>
    </Thead>
    <Tbody>
         <Tr>
          <Td>CEC</Td>
          {Object.values(cec).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Nitrogen</Td>
          {Object.values(nitrogen).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>OC</Td>
          {Object.values(cec).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>OCD</Td>
          {Object.values(ocd).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>ph</Td>
          {Object.values(ph).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Sand</Td>
          {Object.values(sand).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>
        <Tr>
          <Td>Silt</Td>
          {Object.values(silt).map((value, index) => (
            <Td key={index}>{value}</Td>
          ))}
        </Tr>

    </Tbody>
  </Table>
</TableContainer> */}

    
    </div>
     
  ) : null;
}

export default Mapp

// import React, { useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { TableContainer, TableCaption, Thead, Th, Tbody, Tr, Td, Table, Tfoot, Box, Center, Text, Stack, VStack, HStack, ChakraProvider, Button } from "@chakra-ui/react";
// // import Card from "./Card";

// const data = {
//   "Fertility": {
//       "cec": {
//           "cec[0 - 5cm]": 36.8,
//           "cec[15 - 30cm]": 36.4,
//           "cec[30 - 60cm]": 36.3,
//           "cec[5 - 15cm]": 36.3,
//           "unit": "cmol(c)/kg"
//       },
//       "clay": {
//           "clay[0 - 5cm]": 42.6,
//           "clay[15 - 30cm]": 41.3,
//           "clay[30 - 60cm]": 40.6,
//           "clay[5 - 15cm]": 42.3,
//           "unit": "g/100g (%)"
//       },
//       "nitrogen": {
//           "nitrogen[0 - 5cm]": 125,
//           "nitrogen[15 - 30cm]": 81,
//           "nitrogen[30 - 60cm]": 65,
//           "nitrogen[5 - 15cm]": 103,
//           "unit": "g/kg"
//       },
//       "oc": {
//           "oc[0 - 5cm]": 11.7,
//           "oc[15 - 30cm]": 6.4,
//           "oc[30 - 60cm]": 4.9,
//           "oc[5 - 15cm]": 8.7,
//           "unit": "g/kg"
//       },
//       "ocd": {
//           "ocd[0 - 5cm]": 17.9,
//           "ocd[15 - 30cm]": 11.5,
//           "ocd[30 - 60cm]": 8.9,
//           "ocd[5 - 15cm]": 15.5,
//           "unit": "kg/m³"
//       },
//       "ph": {
//           "ph[0 - 5cm]": 7,
//           "ph[15 - 30cm]": 7.1,
//           "ph[30 - 60cm]": 7.4,
//           "ph[5 - 15cm]": 7,
//           "unit": "pH"
//       },
//       "predictions": {
//           "fertile_prediction_count": 2,
//           "infertile_prediction_count": 2,
//           "majority": "Equal(50 - 50%)",
//           "prediction[0 - 5cm]": "1",
//           "prediction[15 - 30cm]": "1",
//           "prediction[30 - 60cm]": "0",
//           "prediction[60 - 100cm]": "0",
//           "totalPrediction": 50
//       },
//       "sand": {
//           "sand[0 - 5cm]": 30.4,
//           "sand[15 - 30cm]": 31,
//           "sand[30 - 60cm]": 31.9,
//           "sand[5 - 15cm]": 30.5,
//           "unit": "g/100g(%)"
//       },
//       "silt": {
//           "silt[0 - 5cm]": 27,
//           "silt[15 - 30cm]": 27.7,
//           "silt[30 - 60cm]": 27.5,
//           "silt[5 - 15cm]": 27.2,
//           "unit": "g/100g (%)"
//       }
//   },
//   "Parameters": [
//       "19.701181359584794",
//       "74.25290928045655",
//       "2022-07-01",
//       "2022-07-30"
//   ],
//   "crop": {
//       "crop[0 - 5cm]": "watermelon",
//       "crop[15 - 30cm]": "watermelon",
//       "crop[30 - 60cm]": "blackgram",
//       "crop[5 - 15cm]": "watermelon",
//       "humidity": 74,
//       "rain": 35.8,
//       "temperature": 26
//   }
// }

// var Fertility = data.Fertility;
// var {cec, clay, nitrogen, oc, ocd, ph, predictions, sand, silt }= data.Fertility;

// const layer = ['Nutrient', 'Humus', 'Top Soil', 'Eluvial Soil', 'Sub Soil', 'Metric']
// function Mapp() {

    // const [ sdata, setSdata ] = useState(data.Fertility);
    // const [cec, setCec] = useState(data.Fertility.cec);
    // const [clay, setClay] = useState(data.Fertility.clay);
    // const [nitrogen, setNitrogen] = useState(data.Fertility.nitrogen)
    // const [oc, setOC] = useState(data.Fertility.oc)
    // const [ocd, setOCD] = useState(data.Fertility.ocd)
    // const [ph, setPH] = useState(data.Fertility.ph)
    // const [sand, setSand] = useState(data.Fertility.sand)
    // const [slit, setSlit] = useState(data.Fertility.silt)
    // const [predictions, setPredictions] = useState(data.Fertility.predictions)


//     const containerStyle = {
//           width: "100%",
//           height: "400px"
//         };
        
//     const center = {
//         lat: 19.704656,
//         lng: 74.248489
//     };

//     const displayData = (data) => {
//       setIsTableVisible(!isTableVisible);
//     }

    
//     const findLocation = () => {
//         var lat = position['lat']
//         var lng = position['lng']
//         // console.log('Latitude:', lat, 'Longitude:', lng); 
 
//         const url = `http://172.19.3.100:5000/post?Lat=${lat}&Long=${lng}&date=2022-07-01&end_dt=2022-07-30`;// Replace with your desired endpoint // Replace with your desired data

//         fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' // Specify the content type of the request
//         }, // Convert the data to JSON format
//         })
//         .then(response => response.json()) // Convert the response to JSON format
//         .then(data => {
//           setSdata(data.Fertility);
//           setCec(data.Fertility.cec);
//           setClay(data.Fertility.clay);
//           setNitrogen(data.Fertility.nitrogen)
//           setOC(data.Fertility.oc)
//           setOCD(data.Fertility.ocd)
//           setPH(data.Fertility.ph)
//           setPredictions(data.Fertility.predictions)
//           setSand(data.Fertility.sand)
//           setSlit(data.Fertility.slit)
          
//           console.log(data.Fertility.cec)
//         // { {cec, clay, nitrogen, oc, ocd, ph, predictions, sand, silt } = sdata.Fertility;}
//           console.log(sdata);
//           setIsTableVisible(!isTableVisible);
//         })
//          // Log the response data to the console
//         .catch(error => console.error(error));
//             }
    
//     const [map, setMap] = useState(null);
//     const [position, setPosition] = useState(null);
//     const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyDWh2tZNTZKRJQQIs6pqspqEiX7f8mxl08"
//     });

//     const handleMapClick = (e) => {
//         const lat = e.latLng.lat();
//         const lng = e.latLng.lng();
//         console.log("Latitude:", lat, "Longitude:", lng);
//         setPosition({ lat, lng });
//     };

//     const onLoad = (map) => {
//     setMap(map);
//     };

//     const [isTableVisible, setIsTableVisible] = useState(false);

//   return isLoaded ? (
//     <div>
//       <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={15}
//           onClick={handleMapClick}
//           onLoad={onLoad}>
//           {position && <Marker position={position} />}
//       </GoogleMap>
//       <button onClick={findLocation}>
//         Start Analysis 
//       </button>
//       {isTableVisible && (
//             <ChakraProvider>
//               <TableContainer>
//             <Table variant='striped' colorScheme='blue'>
//               <Thead>
//               <Tr>
//                     {layer.map((label, index) => (
//                       <Th key={index}>{label}</Th>
//                     ))}
//                   </Tr>
//               </Thead>
//               <Tbody>
//                    <Tr>
//                     <Td>CEC</Td>
//                     {Object.values(cec).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>Nitrogen</Td>
//                     {Object.values(nitrogen).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>OC</Td>
//                     {Object.values(cec).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>OCD</Td>
//                     {Object.values(ocd).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>ph</Td>
//                     {Object.values(ph).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>Sand</Td>
//                     {Object.values(sand).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
//                   <Tr>
//                     <Td>Silt</Td>
//                     {Object.values(silt).map((value, index) => (
//                       <Td key={index}>{value}</Td>
//                     ))}
//                   </Tr>
          
//               </Tbody>
//             </Table>
//           </TableContainer>
//             </ChakraProvider>
//       )}
//     </div>
//   ) : null;
// }

// export default Mapp
