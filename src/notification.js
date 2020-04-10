const express = require('express')
const router = express.Router()

const newOrderForRestaurantEvent = (restaurantId, res) => {
    res.write(`event: newOrderReceived-${restaurantId}\ndata: empty\n\n`);
}

router.get("/", (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders(); // flush the headers to establish SSE with client
    req.app.get('eventEmitter').on('newOrderReceived', (restaurantId) => {
        newOrderForRestaurantEvent(restaurantId, res)
    })

    res.on('close', () => {
        console.log('client dropped me');
    });
});



module.exports = router
