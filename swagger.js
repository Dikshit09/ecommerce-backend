const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
    },
    servers:[
        {
            url: '/api/auth'
        }
    ]
  },
  apis: ['./src/app.js', './src/routes/*.js'],
}

module.exports = swaggerJsdoc(options)