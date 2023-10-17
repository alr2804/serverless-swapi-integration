const axios = require('axios');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.fetchData = async () => {
  let promises = [];
  for (let i = 1; i <= 5; i++) {
    promises.push(axios.get(`https://swapi.dev/api/people/${i}/`));
  }

  const responses = await Promise.all(promises);
  
  for (const [index, response] of responses.entries()) {
    const data = {
      TableName: "SWAPIPeople",
      Item: {
        id: index + 1,  // Assigning integer IDs
        nombre: response.data.name,
        altura: response.data.height,
        peso: response.data.mass,
        color_cabello: response.data.hair_color
      }
    };
    await dynamoDB.put(data).promise();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data for 5 characters fetched and stored successfully!" })
  };
};