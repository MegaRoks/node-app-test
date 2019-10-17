const express = require('express');

const apiSingUp = require('../controllers/users/singUp.controller');
const apiSingIn = require('../controllers/users/singIn.controller');

const router = express.Router();

router.use('/users', apiSingUp);
router.use('/users', apiSingIn);

module.exports = router;
