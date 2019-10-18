const express = require('express');

const apiSignUp = require('../controllers/users/signUp.controller');
const apiSignIn = require('../controllers/users/signIn.controller');

const router = express.Router();

router.use('/users', apiSignUp);
router.use('/users', apiSignIn);

module.exports = router;
