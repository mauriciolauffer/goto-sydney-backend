'use strict';

const router = require('express').Router();
const routes = require('../controllers/routes');

router.get('/', routes.read);

module.exports = router;
