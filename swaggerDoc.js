const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Order Backend',
      version: '1.0.0',
      description: 'Rest endpoints for Order Application',
      servers: ["http://localhost:3003"]
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./src/app.js', './src/controllers/*.js']
};

module.exports = swaggerJsdoc(options);
