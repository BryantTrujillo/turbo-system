const express = require('express');
const shopRouter = express.Router();

const Entity = require('../models/entity');

shopRouter
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
      .end(`${req.method} operations are not supported on ./shop path name.`);
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./shop path name.`);
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(`${req.method} opterations are not supported on ./shop path name.`);
  });

shopRouter
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
        `${req.method} operations are not supported on ./shop path name with a query of /:id.`
      );
  })
  .put((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./shop path name with a query of /:id.`
      );
  })
  .delete((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res
      .status(403)
      .end(
        `${req.method} opterations are not supported on ./shop path name with a query of /:id.`
      );
  });

module.exports = shopRouter;
