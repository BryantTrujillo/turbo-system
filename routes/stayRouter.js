const express = require('express')
const stayRouter = express.Router()

stayRouter
  .route('/')
  .all((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all information about local lodging and amenities to you...');
  })
  .post((req, res) => {
    res.status(403).end('POST operations are not supported on ./stay path name.');
  })
  .put((req, res) => {
    res.status(403).end('PUT opterations are not supported on ./stay path name.');
  })
  .delete((req, res) => {
    res.status(403).end('DELETE opterations are not supported on ./stay path name.');
  });

module.exports = stayRouter