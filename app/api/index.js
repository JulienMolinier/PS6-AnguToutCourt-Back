const { Router } = require('express');
const UniversityRouter = require('./universities');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/universities', UniversityRouter);

module.exports = router;
