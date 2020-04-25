const express = require('express')
const router = express.Router()
const restaurantService = require('../services/restaurantService')
const to = require('await-to-js').default

/**
 * @swagger
 * api/restaurant/:
 *    get:
 *      description: This should return all restaurants
 */
router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, restaurant] = await to(restaurantService.create(body))
    if(err) return next(err)
    return res.json(restaurant)
})
router.get("/", async (req, res, next) => {
    const [err, restaurants] = await to(restaurantService.getAll())
    if(err) return next(err)
    return res.json(restaurants)
})

router.get("/:id", async (req, res, next) => {
    const [err, restaurant] = await to(restaurantService.get(req.params.id))
    if(err) return next(err)
    return res.json(restaurant)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(restaurantService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
