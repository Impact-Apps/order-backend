const express = require('express')
const router = express.Router()
const orderService = require('../services/orderService')
const to = require('await-to-js').default

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, order] = await to(orderService.create(body))
    if(err) return next(err)
    return res.json(order)
})

router.get("/", async (req, res, next) => {
    const [err, orders] = await to(orderService.getAll())
    if(err) return next(err)
    return res.json(orders)
})

router.get("/:id", async (req, res, next) => {
    const [err, order] = await to(orderService.get(req.params.id))
    if(err) return next(err)
    return res.json(order)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(orderService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})



module.exports = router
