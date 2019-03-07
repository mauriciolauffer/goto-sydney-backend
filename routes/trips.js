'use strict';

const router = require('express').Router();
const trips = require('../controllers/trips');

router.get('/', trips.read);

module.exports = router;
