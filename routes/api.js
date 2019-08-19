// const path = require('path');
const express = require('express');
// const rootDir = require('../utils/path');

const router = express.Router();

router.post('/send-rsvp', (req, res, next) => {
    console.log(req.body);
    res.status(200).send({
        message: 'success!'
    });
});

module.exports = router;
