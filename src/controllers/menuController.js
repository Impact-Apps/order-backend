const express = require('express')
const router = express.Router()
const menuService = require('../services/menuService')
const itemService = require('../services/itemService')
const to = require('await-to-js').default
const {isEmpty} = require('lodash')

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, item] = await to(menuService.create(body))
    if(err) return next(err)
    return res.json(item)
})

router.patch("/:restaurantId", async (req, res, next) => {
    const body = req.body
    // console.log(body)
    const [updateErr, upsertedItems] = await to(itemService.upsertItems(body.items))
    if(updateErr) return next(updateErr)
    const itemIds = Object.values(upsertedItems)
    console.log(itemIds)
    if(!isEmpty(itemIds)) {
        // New items were added, add their IDs to the menu
        const [err] = await to(menuService.updateMenuWithNewItems(itemIds, body.restaurantId))
        if(err) return next(err)
    }
    return res.sendStatus(200)
})

router.get("/", async (req, res, next) => {
    const [err, menus] = await to(menuService.getAll())
    if(err) return next(err)
    return res.json(menus)
})

router.get("/:id", async (req, res, next) => {
    const [err, menu] = await to(menuService.get(req.params.id))
    if(err) return next(err)
    return res.json(menu)

})

router.delete("/:id", async (req, res, next) => {
    const [err, deleteResponse] = await to(menuService.deleteMenu(req.params.id))
    if(err) return next(err)
    return res.send(deleteResponse)
})

router.get('/:restaurantId/items', async (req, res, next) => {
    const [err, menu] = await to(menuService.getByRestaurantId(req.params.restaurantId))
    if(err) return next(err);
    const [itemsErr, items] = await to(itemService.findItemsForMenu(menu.itemIds)) 
    if(itemsErr) return next(itemsErr)
    return res.send(items)
})


module.exports = router
