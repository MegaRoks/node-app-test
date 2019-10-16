const express = require('express');

const db = require('../../db');
const DownloadFile = require('../../modules/file/getFile.model');

const router = express.Router();

// handles url http://localhost:8081/api/files/:url_code/
router.get('/:url_code', async (req, res) => {
    try {
        const urlCode = req.params.url_code;
        const downloadFile = new DownloadFile(urlCode);
        const filesDitails = (await db.query(downloadFile.getFileByUrlCode())).rows[0];
        return res.status(200).json({
            filesDitails,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;