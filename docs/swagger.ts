import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'cloudImg',
            description: 'Cloud media Storage',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                authsecurity: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                authsecurity: []
            }
        ],
    },
    // looks for configuration in specified directories
    apis: ['./routes/docs.ts'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app: Application) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
export default swaggerDocs 