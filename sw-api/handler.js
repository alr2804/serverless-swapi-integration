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
  module.exports.createData = async (event) => {
    const body = JSON.parse(event.body);
    const params = {
      TableName: "SWAPIPeople",
      Item: body
    };
    await dynamoDB.put(params).promise();
  
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Character created successfully!" })
    };
  };
  
  module.exports.getAllData = async () => {
    const params = {
      TableName: "SWAPIPeople"
    };
  
    const result = await dynamoDB.scan(params).promise();
  
    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No characters found!" })
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  };
  
  module.exports.getDataById = async (event) => {
    const id = parseInt(event.pathParameters.id);
  
    const params = {
      TableName: "SWAPIPeople",
      Key: {
        id: id
      }
    };
  
    const result = await dynamoDB.get(params).promise();
  
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Character not found!" })
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  };
  
  module.exports.updateData = async (event) => {
    const id = parseInt(event.pathParameters.id);
    const body = JSON.parse(event.body);
  
    const params = {
      TableName: "SWAPIPeople",
      Key: {
        id: id
      },
      UpdateExpression: "SET #name = :name, #height = :height",  // Extend this for other attributes
      ExpressionAttributeNames: {
        "#name": "name",
        "#height": "height"
      },
      ExpressionAttributeValues: {
        ":name": body.name,
        ":height": body.height
      }
    };
  
    await dynamoDB.update(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Character updated successfully!" })
    };
  };
  
  module.exports.deleteData = async (event) => {
    const id = parseInt(event.pathParameters.id);
  
    const params = {
      TableName: "SWAPIPeople",
      Key: {
        id: id
      }
    };
  
    await dynamoDB.delete(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Character deleted successfully!" })
    };
  };