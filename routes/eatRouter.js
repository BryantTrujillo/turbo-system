const express = require('express')
const eatRouter = express.Router()

eatRouter
  .route('/')
  .all((req, res, next) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all information about local resturaunts to you...');
  })
  .post((req, res) => {
    res.status(403).end('POST operations are not supported on ./eat path name.');
  })
  .put((req, res) => {
    res.status(403).end('PUT opterations are not supported on ./eat path name.');
  })
  .delete((req, res) => {
    res.status(403).end('DELETE opterations are not supported on ./eat path name.');
  });

module.exports = eatRouter