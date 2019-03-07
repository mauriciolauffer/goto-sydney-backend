'use strict';

const gtfs = require('gtfs-stream');
const request = require('request');

function readTrips(routeId) {
  return new Promise(function(resolve, reject) {
    const trips = [];
    const optionsRealtime = {
      url: 'https://api.transport.nsw.gov.au/v1/gtfs/realtime/ferries',
      headers: {
        'authorization': 'apikey ' + process.env.NSW_API_KEY
      }
    };
    request.get(optionsRealtime)
      .pipe(gtfs.rt())
      .on('data', (entity) => {
        if (entity.trip_update.trip.route_id === routeId) {
          trips.push(entity);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        resolve(trips);
      });
  });
}

function readVehicles(trips) {
  return new Promise(function(resolve, reject) {
    const optionsVehiclepos = {
      url: 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/ferries',
      headers: {
        'authorization': 'apikey ' + process.env.NSW_API_KEY
      }
    };
    request.get(optionsVehiclepos)
      .pipe(gtfs.rt())
      .on('data', (entity) => {
        const trip = trips.find(function(trip) {
          return entity.vehicle.trip.trip_id === trip.trip_update.trip.trip_id;
        });
        if (trip) {
          trip.vehicle = entity;
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        resolve(trips);
      });
  });
}

function readRealtime(req, res, next) {
  readTrips(req.query.routeId)
    .then(function(trips) {
      return readVehicles(trips);
    })
    .then(function(trips) {
      return res.status(200).json(trips);
    })
    .catch(function(err) {
      return res.status(500).json({ error: err.toString() });
    });
}

module.exports = { readRealtime };
