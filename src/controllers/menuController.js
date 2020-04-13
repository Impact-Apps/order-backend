const express = require('express')
const router = express.Router()
const menuService = require('../services/menuService')
const itemService = require('../services/itemService')
const to = require('await-to-js').default

router.post("/", async (req, res, next) => {
    const body = req.body
    const [err, item] = await to(menuService.create(body))
    if(err) return next(err)
    return res.json(item)
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
    console.log(req.user.sub)
    const [err, menu] = await to(menuService.getByRestaurantId(req.params.restaurantId))
    if(err) return next(err);
    const [itemsErr, items] = await to(itemService.findItemsForMenu(menu.itemIds)) 
    if(itemsErr) return next(itemsErr)
    return res.send(items)
})


module.exports = router
