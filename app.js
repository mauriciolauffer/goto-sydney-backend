'use strict';

require('dotenv').load();
const logger = require('./util/logger');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();
const corsOrigin = (process.env.CORS_ORIGIN === '*') ? process.env.CORS_ORIGIN : new RegExp('^' + process.env.CORS_ORIGIN);
const corsParams = {
  origin: corsOrigin,
  credentials: false,
  allowHeaders: ['Content-Type', 'X-Requested-With', 'Accept', 'Expires', 'Last-Modified', 'Cache-Control']
};

if (app.get('env') === 'production') {
  app.use(morgan('combined', { 'stream': logger.stream }));
} else {
  app.use(morgan('dev', { 'stream': logger.stream }));
}

app.enable('trust proxy');
app.use(helmet());
app.use(compression());
app.use(cors(corsParams));
app.options('*', cors(corsParams));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/index'));

// Error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Production error handler no stacktraces leaked to user
app.use((err, req, res, next) => {
  const errorResponse = {
    message: err.message,
    messageCode: err.messageCode,
    error: (app.get('env') === 'development') ? err : {}
  };
  res.status(err.status || 500).json(errorResponse);
});

module.exports = app;
