const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');

const router = express.Router();

router.post('/sendRsvp', (req, res, next) => {
    // TODO: call firebase function for sending rsvp
});

module.exports = router;