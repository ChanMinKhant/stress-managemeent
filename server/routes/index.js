const authRoutes = require('./auth');
const router = require('express').Router();

router.use('/auth', authRoutes);

module.exports = router;
