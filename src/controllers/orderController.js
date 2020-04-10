const express = require('express')
const router = express.Router()
const orderService = require('../services/orderService')
const to = require('await-to-js').default
const { isEmpty } = require('lodash')

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, order] = await to(orderService.create(body))
    if(err) return next(err)
    req.app.get('eventEmitter').emit('newOrderReceived', order.restaurantId)
    return res.json(order)
})


router.get("/", async (req, res, next) => {
    const { filter }  = req.query || {};
    const parsedFilter = isEmpty(filter) ? {} : JSON.parse(filter);
    const [err, orders] = await to(orderService.getAll({...parsedFilter}))
    if(err) return next(err) 
    return res.json(orders)

})

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params
    const update = req.body
    const [err, updatedOrder] = await to(orderService.updateOrder(id, update))
    if(err) return next(err)
    return res.json(updatedOrder)
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
