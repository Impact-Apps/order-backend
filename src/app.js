require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use("/api", router)
router.use("/auth", require('./controllers/authController.js'))



router.get("/:id", async (req, res) => {

    return res.send('hell world: ' +  req.params.id)
})

module.exports = app;
