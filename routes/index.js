const express = require('express');
const router  = express.Router();
const publish_controller = require('../controller/send');
const consumer_controller = require('../controller/receive');

router.post('/publish', (req, res, next)=>{

    let message = req.body.message;

    res.status(200).json({
        message: `successfully received message :: ${message}`
    });

    publish_controller.sendorders("order-placed", message);
});

router.get('/consumer', (res, req)=>{
    consumer_controller.receiveMessage()
})

module.exports = router;