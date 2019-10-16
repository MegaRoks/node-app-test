const express = require('express');

const db = require('../../db');
const DownloadFile = require('./../../modules/file/downloadFile.model');

const router = express.Router();

// handles url http://localhost:8081/api/files/:url_code/:name_file
router.get('/:url_code/:name_file', async (req, res) => {
    try {
        const { name_file, url_code } = req.params;
        const downloadFile = new downloadFile(url_code);
        db.query(downloadFile.updateCountDownload());
        const file = `${__dirname}/../../../storage/${name_file}`;
        res.download(file);
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;
