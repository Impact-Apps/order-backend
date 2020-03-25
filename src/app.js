require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');



const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router)
router.use("/auth", require('./controllers/authController.js'))
router.use("/restaurants", require('./controllers/restaurants.js'))



router.get("/:id", async (req, res) => {

    return res.send('hello world: ' +  req.params.id)
})

module.exports = app;
