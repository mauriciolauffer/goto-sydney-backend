'use strict';

const router = require('express').Router();
const calendar = require('../controllers/calendar');

router.get('/', calendar.read);

module.exports = router;
