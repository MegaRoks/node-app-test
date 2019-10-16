const express = require('express');

const db = require('../../db');
const DownloadFile = require('./../../modules/file/downloadFile.model');

const router = express.Router();

// handles url http://localhost:8081/api/files/:url_code//:name_file
router.get('/download/:name_file', async (req, res) => {
    try {
        const nameFile = req.params.name_file;
        const urlCode = req.params.url_code;
        const downloadFile = new downloadFile(urlCode);
        db.query(downloadFile.updateCountDownload());
        const file = `${__dirname}/../../../storage/${nameFile}`;
        res.download(file);
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;
