const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("This is the root route...")
})

module.exports = router
