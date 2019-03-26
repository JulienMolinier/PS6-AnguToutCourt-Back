const {Router} = require('express');
const {University} = require('../../models');
const router = new Router();

router.get('/', (req, res) => res.status(200)
  .json(University.get()));


module.exports = router;
