const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders(); // flush the headers to establish SSE with client

    let counter = 0;
    let interValID = setInterval(() => {
        counter++;
        if (counter >= 10) {
            clearInterval(interValID);
            res.end(); // terminates SSE session
            return;
        }

        res.write('data: normal message\n\n');
        res.write(`event: notification\ndata: received a special message through the notification listener message ${JSON.stringify(counter)}\n\n`);
        // res.write(JSON.stringify({'event':'blah', 'data':'special'}));

    }, 1000);

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');
        clearInterval(interValID);
        res.end();
    });
});



module.exports = router
