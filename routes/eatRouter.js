const express = require('express');
const eatRouter = express.Router();

const Entity = require('../models/entity');

eatRouter
  .route('/')
  .get((req, res, next) => {
    Entity.find()
      .then((entities) => {
        console.log(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(entities);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} operations are not supported on ./eat path name.`);
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./eat path name.`);
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./eat path name.`);
  });

eatRouter
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
        `${req.method} operations are not supported on ./eat path name with a query of /${req.params.id}.`
      );
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./eat path name with a query of /${req.params.id}.`
      );
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./eat path name with a query of /${req.params.id}.`
      );
  });

module.exports = eatRouter;
