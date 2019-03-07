'use strict';

const router = require('express').Router();
const realtime = require('../controllers/realtime');

router.get('/', realtime.readRealtime);

module.exports = router;
