const express = require('express');

const apiSingUp = require('./../controllers/users/singUp.controller');
const apiSingIn = require('./../controllers/users/singIn.controller');
const apiFiles = require('./../controllers/files/files.controler');
const apiListFile = require('./../controllers/files/listFiles.controler');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This API is working');
});

router.use('/users', apiSingUp);
router.use('/users', apiSingIn);
router.use('/files', apiFiles);
router.use('/files', apiListFile);

module.exports = router;
