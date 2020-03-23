const express = require('express')
const router = express.Router()
const restaurantService = require('../services/restaurantService')



router.post("/", async (req, res) => {
    const body = req.body
    const restaurant = await restaurantService.create(body)
    return res.json(restaurant)
})
router.get("/", async (req, res) => {
    const restaurants = await restaurantService.getAll()
    console.log(restaurants)
    return res.json(restaurants)
})

router.get("/:id", async (req, res) => {
    const restaurant = await restaurantService.get(req.params.id)
    return res.json(restaurant)

})

router.delete("/:id", async (req, res) => {
    const deleteResponse = await restaurantService.deleteRestaurant(req.params.id)
    return res.send(deleteResponse)
})



module.exports = router
