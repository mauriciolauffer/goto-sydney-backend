'use strict';

const logger = require('./util/logger');
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info('Listening port: ' + port);
});
