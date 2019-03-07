'use strict';

const router = require('express').Router();
const trips = require('../controllers/tripdirections');

router.get('/', trips.read);

module.exports = router;
