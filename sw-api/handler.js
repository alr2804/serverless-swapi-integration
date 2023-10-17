const axios = require('axios');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

//get data characters from SWAPI
module.exports.fetchData = async () => {
  let promises = [];
  for (let i = 1; i <= 10; i++) {
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
        color_cabello: response.data.hair_color,
        color_piel: response.data.skin_color,
        color_ojos: response.data.eye_color,
        nacimiento: response.data.birth_year,
        genero: response.data.gender,
        url_original: response.data.url
      }
    };
    await dynamoDB.put(data).promise();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data for 10 characters fetched and stored successfully!" })
  };
};


//POST
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
  

//GET 
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
  

//GET
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
  

//PUT
module.exports.updateData = async (event) => {
  const id = parseInt(event.pathParameters.id);
  const body = JSON.parse(event.body);

  const params = {
      TableName: "SWAPIPeople",
      Key: {
          id: id
      },
      UpdateExpression: `
          SET nombre = :nombre, 
              altura = :altura,
              peso = :peso,
              color_cabello = :color_cabello,
              color_piel = :color_piel,
              color_ojos = :color_ojos,
              nacimiento = :nacimiento,
              genero = :genero,
              url_original = :url_original
      `,
      ExpressionAttributeValues: {
          ":nombre": body.nombre,
          ":altura": body.altura,
          ":peso": body.peso,
          ":color_cabello": body.color_cabello,
          ":color_piel": body.color_piel,
          ":color_ojos": body.color_ojos,
          ":nacimiento": body.nacimiento,
          ":genero": body.genero,
          ":url_original": body.url_original
      }
  };

  try {
      await dynamoDB.update(params).promise();
      return {
          statusCode: 200,
          body: JSON.stringify({ message: "Character updated successfully!" })
      };
  } catch (error) {
      console.error('Error updating character:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ message: "Failed to update character." })
      };
  }
};
  
//DELETE
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
