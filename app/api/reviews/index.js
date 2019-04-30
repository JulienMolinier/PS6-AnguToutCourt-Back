const { Router } = require('express');
const { Review, Profile, University } = require('../../models');
const email = require('../profiles/index.js');

const router = new Router();

function attachStudent(review) {
  return Object.assign({}, review, { profile: email.getByEmail(review.email) });
}

function attachUniv(review) {
  return Object.assign({}, review, { university: University.getById(review.universityId) });
}

function attach(review) {
  let reviewToSend = attachStudent(review);
  reviewToSend = attachUniv(review);
  return reviewToSend;
}

router.get('/', (req, res) => {
  try {
    if (req.query.q) {
      res.status(200).json(Review.search(req.query.q).map(review => attach(review)));
    } else {
      res.status(200).json(Review.get()
        .map(review => attach(review)));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const reviewToSend = Review.getById(req.params.id);
    res.status(200).json(attach(reviewToSend));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const review = Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:id', (req, res) => {
  try {
    res.status(200).json(Profile.update(req.params.id, req.body));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', (req, res) => {
  try {
    Profile.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
