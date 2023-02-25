import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { TableContainer, TableCaption, Grid, Heading, Thead, Th, Tbody, Tr, Td, Table, Tfoot, Box, Center, Text, Stack, VStack, HStack, ChakraProvider, Button } from "@chakra-ui/react";
import Card from "./Card";

const data = {
    "Fertility": {
        "cec": {
            "cec[0 - 5cm]": 36.8,
            "unit": "cmol(c)/kg"
        },
        "clay": {
            "clay[0 - 5cm]": 42.6,
            "unit": "g/100g (%)"
        },
        "nitrogen": {
            "nitrogen[0 - 5cm]": 125,
            "unit": "g/kg"
        },
        "oc": {
            "oc[0 - 5cm]": 11.7,
            "unit": "g/kg"
        },
        "ocd": {
            "ocd[0 - 5cm]": 17.9,
            "unit": "kg/m³"
        },
        "ph": {
            "ph[0 - 5cm]": 7,
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
            "unit": "g/100g(%)"
        },
        "silt": {
            "silt[0 - 5cm]": 27,
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

function SoilAnalysis({cec}) {
  console.log(cec)

    const [ sdata, setSdata ] = useState(data.Fertility);

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

    const handlePrintClick = () => {
      window.print();
    };

  return isLoaded ? (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <Navbar />
            <ChakraProvider>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
    <Box>
      <Heading>Fertility</Heading>
      <br></br>
      <VStack align="stretch" spacing={4}>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">CEC</Heading>
          {Object.entries(sdata.cec).map(([key, value]) => (
            <HStack key={key}>
                <Text key={key}>
                {key}: {value}
                </Text>
            </HStack>
          ))}
        </Box>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">Clay</Heading>
          {Object.entries(sdata.clay).map(([key, value]) => (
            <HStack key={key}>
              <Text>{key}:</Text>
              <Text fontWeight="bold">{value}</Text>
            </HStack>
          ))}

          <ul>
        </ul>
        </Box>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">Nitrogen</Heading>
          {Object.entries(sdata.nitrogen).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
    <Box >
      <Heading>Organic Matter</Heading>
      <br></br>
      <VStack align="stretch" spacing={4}>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">OC</Heading>
          {Object.entries(sdata.oc).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">OCD</Heading>
          {Object.entries(sdata.ocd).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">pH</Heading>
          {Object.entries(sdata.ph).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
    <Box >
      <Heading>Sand & Silt</Heading>
      <br></br>
      <VStack align="stretch" spacing={4}>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">Sand</Heading>
          {Object.entries(sdata.sand).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">Silt</Heading>
          {Object.entries(sdata.silt).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
    <Box>
      <Heading>Predictions</Heading>
      <br></br>
      <VStack align="stretch" spacing={4}>
        <Box color='white'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='5'  backgroundColor={"#3d3d3d"}>
          <Heading size="md">Fertile Prediction Count</Heading>
          {Object.entries(sdata.predictions).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </Box>
      </VStack>
    </Box>
  </Grid> 
  <br></br>
  {/* <button onClick={this.handlePrintClick}>

  </button> */}
  <Button onClick={() => handlePrintClick()} style={{background: "blue", color: "white"}}>
    Download
  </Button>
    </ChakraProvider>

{/* {Object.entries(sdata).map(([key, value]) => (
            <li>{key} {value}</li>
))} */}
    </div>

  ) : null;

}

export default SoilAnalysis