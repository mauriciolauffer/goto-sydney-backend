'use strict';

const router = require('express').Router();
const stoptimes = require('../controllers/stoptimes');

router.get('/', stoptimes.read);

module.exports = router;
