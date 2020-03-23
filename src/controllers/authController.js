const express = require('express')
const router = express.Router()
const authService = require('../services/authService')

// Add middleware to validate user fields
router.post("/signup", async (req, res) => {

    const userDTO = req.body
    const user = await authService.signUp(userDTO);
    return res.json({ user })
})

router.post("/login", async (req, res) => {

    const {email, password} = req.body
    const user = await authService.login(email, password);
    return res.json({ user })
})

module.exports = router
