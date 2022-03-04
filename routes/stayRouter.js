const express = require('express');
const stayRouter = express.Router();

const Entity = require('../models/entity');

stayRouter
  .route('/')
  .get((req, res, next) => {
    Entity.find()
      .then((entities) => {
        console.log(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', ['text/plain', 'application/json']);
        res.json(entities);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} operations are not supported on ./stay path name.`);
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./stay path name.`);
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./stay path name.`);
  });

stayRouter
  .route('/:id')
  .get((req, res, next) => {
    Entity.findById(req.params.id)
      .then((entity) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(entity);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} operations are not supported on ./stay path name with a query of /:id.`
      );
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./stay path name with a query of /:id.`
      );
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./stay path name with a query of /:id.`
      );
  });

module.exports = stayRouter;
