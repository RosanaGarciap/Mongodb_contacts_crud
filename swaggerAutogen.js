const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'Contacts managger API',
    },
    host: 'mongodb-contacts-crud.onrender.com',
    schemes: ['https', 'http'],
definitions: {
        Contact: {
            firstName: "Jonas",
            lastName: "Doe",
            email: "jonas.doe@example.com",
            favoriteColor: "blue",
            birthday: "1990-01-01"
        }
    }
};
const outputFile = './swagger.json';
// ponts to the path where all routes to GET, POST, PUT and DELETE are listed (routes/contacts.js in this case)
const endpointFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointFiles, doc);