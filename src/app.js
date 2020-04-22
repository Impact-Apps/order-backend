require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');


const cors = require('cors');
const express = require('express')
const app = express()
app.use(cors());
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()

const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();
app.set('eventEmitter', eventEmitter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", router)

router.use('/events', require('./notification'))

router.use("/auth", require('./controllers/authController.js'))
router.use("/restaurant", require('./controllers/restaurantController.js'))
router.use("/order", require('./controllers/orderController.js'))
router.use("/item", require('./controllers/itemController.js'))
router.use("/menu", require('./controllers/menuController.js'))
router.use("/restaurant", require('./controllers/restaurantReviewController.js'))
router.use("/item", require('./controllers/ItemReviewController.js'))



router.get("/:id", async (req, res) => {
    return res.send('hello world: ' +  req.params.id)
})

module.exports = app;
