'use strict';

const router = require('express').Router();
const stops = require('../controllers/stops');

router.get('/', stops.read);

module.exports = router;
