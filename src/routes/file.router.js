const express = require('express');

const apiAddFiles = require('./../controllers/files/addFiles.controller');
const apiListFile = require('./../controllers/files/listFiles.controller');
const apiGetFile = require('./../controllers/files/getFile.controller');
const apiDeleteFile = require('./../controllers/files/deleteFile.controller');

const router = express.Router();

router.use('/file', apiAddFiles);
router.use('/files', apiListFile);
router.use('/', apiGetFile);
router.use('/file', apiDeleteFile);

module.exports = router;