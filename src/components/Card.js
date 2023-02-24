import { TableContainer, TableCaption, Thead, Th, Tbody, Tr, Td, Table, Tfoot, Box, Center, Text, Stack, VStack, HStack, ChakraProvider, Button } from "@chakra-ui/react";
// import { ChakraProvider } from "@chakra-ui/react";
import react from "react";
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
const {cec, clay, nitrogen, oc, ocd, ph, predictions, sand, silt }= data.Fertility;

const layer = ['Nutrient', 'Humus', 'Top Soil', 'Eluvial Soil', 'Sub Soil', 'Metric']

const Card = ({ title, data }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>{title}</Text>
      <VStack spacing={4} alignItems="stretch">
        {Object.keys(data).map((key) => (
          <Box key={key} p={2} bg="gray.50" borderRadius="md">
            <Text fontWeight="bold" fontSize="md" mb={2}>{key}</Text>
            <Stack spacing={1}>
              {Object.keys(data[key]).map((innerKey) => (
                <HStack key={innerKey}>
                  <Text fontSize="md" fontWeight="semibold">{innerKey} = </Text>
                  <Text fontSize="md">{data[key][innerKey]}</Text>
                </HStack>
              ))}
            </Stack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

const MyTable = () => {
    return (
        <TableContainer>
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
</TableContainer>
    );
}

const DownloadPdf = () => {
    // using Java Script method to get PDF file
    fetch('Hackathon/public/SoilMetrix.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'SoilMetric';
            alink.click();
        })
    })

}

const MyComponent = () => {
  return (
    <ChakraProvider>
    {/* <Center>
      <Box maxWidth="xl">
        <Card title="Fertility" data={data.Fertility} />
      </Box>
    </Center> */}
    <MyTable/>
    <Button color='white' background='blue' onClick={DownloadPdf}>
        Download PDF
    </Button>
    </ChakraProvider>




  );
};

export default MyComponent;
