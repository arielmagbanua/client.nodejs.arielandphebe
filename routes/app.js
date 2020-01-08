const express = require('express');
const appController = require('../controllers/app');
const router = express.Router();

router.get('/', appController.getIndex);
router.get('/social', appController.getSocial);

module.exports = router;
