const express = require('express')
const router = express.Router()
const restaurantService = require('../services/restaurantService')
const to = require('await-to-js').default

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

router.get("/:auth0Id", async (req, res, next) => {
    const { auth0Id } = req.params || {}
    const filter = {
        auth0Id
    }
    const [err, restaurant] = await to(restaurantService.get(filter))
    if(err) return next(err)
    return res.json(restaurant[0])

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(restaurantService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
