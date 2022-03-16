const express = require('express');
const stayRouter = express.Router();

const authenticate = require('../authenticate');
const cors = require('./cors');

const Entity = require('../models/entity');

stayRouter
  .route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Entity.find({ category: { $elemMatch: { $eq: 'isStay' } } })
      .populate('comments.author')
      .then((entities) => {
        // console.log(req.body) <-- for testing
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(entities);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Entity.create(req.body)
        .then((entity) => {
          console.log('Entity created ', entity);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(entity);
          // res <-- no longer used
          //   .status(403)
          //   .end(`${req.method} operations are not supported on ./stay path name.`);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      // res.setHeader('Content-Type', 'text/plain'); <-- not needed
      res
        .status(403)
        .end(
          `${req.method} opterations are not supported on ./stay path name.`
        );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Entity.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
          // res <-- no longer used
          //   .status(403)
          //   .end(`${req.method} opterations are not supported on ./stay path name.`);
        })
        .catch((err) => next(err));
    }
  );

stayRouter
  .route('/:entity_id')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .populate('comments.author')
      .then((entity) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(entity);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      // res.setHeader('Content-Type', 'text/plain'); <-- not needed
      res
        .status(403)
        .end(
          `${req.method} operations are not supported on ./stay path name with a parameter of /${req.params.entity_id}.`
        );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Entity.findByIdAndUpdate(
        req.params.entity_id,
        { $set: req.body },
        { new: true }
      )
        .then((entity) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(entity);
          // res <-- no longer used
          //   .status(403)
          //   .end(
          //     `${req.method} opterations are not supported on ./stay path name with a parameter of /${req.params.entity_id}.`
          //   );
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Entity.findByIdAndDelete(req.params.entity_id)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
          // res <-- no longer used
          //   .status(403)
          //   .end(
          //     `${req.method} opterations are not supported on ./stay path name with a parameter of /${req.params.entity_id}.`
          //   );
        })
        .catch((err) => next(err));
    }
  );

stayRouter
  .route('/:entity_id/comments')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .populate('comments.author')
      .then((entity) => {
        if (entity) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(entity.comments);
        } else {
          err = new Error(`Entity ${req.params.entity_id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .then((entity) => {
        if (entity) {
          req.body.author = req.user._id;
          entity.comments.push(req.body);
          entity
            .save()
            .then((entity) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(entity);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Entity ${req.params.entity_id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res
        .status(403)
        .end(
          `${req.method} opteration not supported on /stay/${req.params.entity_id}/comments`
        );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Entity.findById(req.params.entity_id)
        .then((entity) => {
          if (entity) {
            for (let i = entity.comments.length - 1; i >= 0; i--) {
              entity.comments.id(entity.comments[i]._id).remove();
            }
            entity
              .save()
              .then((entity) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(entity);
              })
              .catch((err) => next(err));
          } else {
            err = new Error(`Entity ${req.params.entity_id} not found`);
            err.status = 404;
            return next(err);
          }
        })
        .catch((err) => next(err));
    }
  );

stayRouter
  .route('/:entity_id/comments/:comment_id')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .populate('comments.author')
      .then((entity) => {
        if (entity && entity.comments.id(req.params.comment_id)) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(entity.comments.id(req.params.comment_id));
        } else if (!entity) {
          err = new Error(`Entity ${req.params.entity_id} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.comment_id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res
        .status(403)
        .end(
          `${req.method} opteration not supported on /stay/${req.params.entity_id}/comments/${req.params.comment_id}`
        );
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .then((entity) => {
        if (entity && entity.comments.id(req.params.comment_id)) {
          if (
            entity.comments
              .id(req.params.comment_id)
              .author._id.equals(req.user._id)
          ) {
            if (req.body.rating) {
              entity.comments.id(req.params.comment_id).rating =
                req.body.rating;
            }
            if (req.body.text) {
              entity.comments.id(req.params.comment_id).text = req.body.text;
            }
            entity
              .save()
              .then((entity) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(entity);
              })
              .catch((err) => next(err));
          } else {
            const err = new Error('You are not the author of this comment!');
            err.status = 403;
            return next(err);
            // res.end(); <-- no longer used
          }
        } else if (!entity) {
          err = new Error(`Entity ${req.params.entity_id} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.comment_id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Entity.findById(req.params.entity_id)
      .then((entity) => {
        if (entity && entity.comments.id(req.params.comment_id)) {
          if (
            entity.comments
              .id(req.params.comment_id)
              .author_id.equals(req.user._id)
          ) {
            entity.comments.id(req.params.comment_id).remove();
            entity
              .save()
              .then((entity) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(entity);
              })
              .catch((err) => next(err));
          } else {
            const err = new Error('You are not the author of this comment!');
            err.status = 403;
            return next(err);
            // res.end(); <-- no longer used
          }
        } else if (!entity) {
          err = new Error(`Entity ${req.params.entity_id} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Comment ${req.params.comment_id} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = stayRouter;
