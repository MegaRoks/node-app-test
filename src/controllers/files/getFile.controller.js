const express = require('express');

const db = require('../../db');
const DownloadFile = require('../../modules/file/getFile.model');

const router = express.Router();

// handles url http://localhost:8081/:url_code/
router.get('/:url_code', async (req, res) => {
    try {
        const { url_code } = req.params;
        const downloadFile = new DownloadFile(url_code);
        const { file_name } = (await db.query(downloadFile.getFileByUrlCode())).rows[0];
        db.query(downloadFile.updateCountDownload());
        const file = `${__dirname}/../../../storage/${file_name}`;
        res.download(file);
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;
