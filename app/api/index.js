const { Router } = require('express');
const UniversityRouter = require('./universities');
const ProfileRouter = require('./profiles');
const ReviewRouter = require('./reviews');

const LoginRouter = require('./login');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/universities', UniversityRouter);
router.use('/profiles', ProfileRouter);
router.use('/reviews', ReviewRouter);

router.use('/login', LoginRouter);

module.exports = router;
