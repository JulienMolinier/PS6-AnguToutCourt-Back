const { Router } = require('express');
const UniversityRouter = require('./universities');
const ProfileRouter = require('./profiles');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/universities', UniversityRouter);
router.use('/profiles', ProfileRouter);

module.exports = router;
