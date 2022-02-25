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
    res.status(403).end(`${req.method} operations are not supported on ./stay path name.`);
  })
  .put((req, res) => {
    res.status(403).end(`${req.method} opterations are not supported on ./stay path name.`);
  })
  .delete((req, res) => {
    res.status(403).end(`${req.method} opterations are not supported on ./stay path name.`);
  });

stayRouter
    .route('/:id', (req, res, next) => {
        res.status(200)
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end('Will send all information about local lodging and amenities to you...');
  })
  .post((req, res) => {
    res.status(403).end(`${req.method} operations are not supported on ./stay path name with a query of /:id.`);
  })
  .put((req, res) => {
    res.status(403).end(`${req.method} opterations are not supported on ./stay path name with a query of /:id.`);
  })
  .delete((req, res) => {
    res.status(403).end(`${req.method} opterations are not supported on ./stay path name with a query of /:id.`);
  });

module.exports = stayRouter