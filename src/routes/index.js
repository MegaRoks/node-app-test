const express = require('express');

const apiSingUp = require('./../controllers/users/singUp.controller');
const apiSingIn = require('./../controllers/users/singIn.controller');
const apiAddFiles = require('./../controllers/files/addFiles.controller');
const apiListFile = require('./../controllers/files/listFiles.controller');
const apiGetFile = require('./../controllers/files/getFile.controller');
const apiDownloadFile = require('./../controllers/files/downloadFile.controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This API is working');
});

router.use('/users', apiSingUp);
router.use('/users', apiSingIn);
router.use('/files', apiAddFiles);
router.use('/files', apiListFile);
router.use('/files', apiDownloadFile);

module.exports = router;
