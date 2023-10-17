const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });
const { fetchPlanetsData, createPlanet, deletePlanet } = require('./../handler');

describe('Planets endpoints', () => {

    beforeEach(() => {
        AWSMock.setSDKInstance(AWS);
    });

    afterEach(() => {
        AWSMock.restore('DynamoDB.DocumentClient');
    });

    // Test for fetchPlanetsData
    it('should fetch and store planets data', async () => {
        // Mock the external API call
        jest.mock('axios', () => ({
            get: jest.fn(() => Promise.resolve({ data: { name: "Earth", /* ... other fields ... */ } })),
        }));

        AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, {});
        });

        const result = await fetchPlanetsData();

        console.log(result)

        expect(result.statusCode).toEqual(200);
    }, 15000);

    // // Test for createPlanet
    // it('should insert planet into DynamoDB', async () => {
    //     const planet = {
    //         nombre: "Earth",
    //         // ... other fields ...
    //     };

    //     AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
    //         callback(null, {});
    //     });

    //     const result = await createPlanet({
    //         body: JSON.stringify(planet)
    //     });

    //     expect(result.statusCode).toEqual(200);
    // });

    // // Test for deletePlanet
    // it('should delete planet from DynamoDB', async () => {
    //     const planetId = 1;

    //     AWSMock.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
    //         callback(null, {});
    //     });

    //     const result = await deletePlanet({
    //         pathParameters: { id: planetId.toString() }
    //     });

    //     expect(result.statusCode).toEqual(200);
    // });

    
});