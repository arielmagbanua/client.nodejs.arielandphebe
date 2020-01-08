const express = require('express');
const apiController = require('../controllers/api');

const router = express.Router();

router.post('/send-rsvp', apiController.postSendRSVP);

module.exports = router;
