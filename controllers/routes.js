'use strict';

const fs = require('fs');

function read(req, res, next) {
  res.setHeader('content-type', 'application/json');
  fs.createReadStream(__dirname + '/../gtfs/routes.json').pipe(res);
}

module.exports = { read };
