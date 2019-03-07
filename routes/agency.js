'use strict';

const router = require('express').Router();
const agency = require('../controllers/agency');

router.get('/', agency.read);

module.exports = router;
