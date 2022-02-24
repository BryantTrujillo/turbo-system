const express = require('express')
const shopRouter = express.Router()

shopRouter
  .route('/')
  .all((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all information about local retail establishments to you...');
  })
  .post((req, res) => {
    res.status(403).end('POST operations are not supported on ./shop path name.');
  })
  .put((req, res) => {
    res.status(403).end('PUT opterations are not supported on ./shop path name.');
  })
  .delete((req, res) => {
    res.status(403).end('DELETE opterations are not supported on ./shop path name.');
  });

module.exports = shopRouter