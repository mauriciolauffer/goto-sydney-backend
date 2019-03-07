'use strict';

const router = require('express').Router();

router.use('/agency', require('./agency'));
router.use('/routes', require('./routes'));
router.use('/stops', require('./stops'));
router.use('/stoptimes', require('./stoptimes'));
router.use('/trips', require('./trips'));
router.use('/tripdirections', require('./tripdirections'));
router.use('/calendar', require('./calendar'));
router.use('/realtime', require('./realtime'));

module.exports = router;
