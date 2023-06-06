const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Cloud Files',
            version: '1.0.0',
            description: 'API documentation',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to my route files
};

// Initialize Swagger JSDoc
const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;
