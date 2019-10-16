const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const db = require('../../db');
const File = require('../../modules/file/addFile.model');
const upload = require('../../config/multer.config');

const router = express.Router();

// handles url http://localhost:8081/api/files/upload/
router.post('/upload', upload, async (req, res) => {
    try {
        const { userId } = getDecodeToken(req.headers.token);
        const createDate = moment().format();
        const { filename, path } = req.file;
        const urlCode = shortid.generate();
        const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;
        const file = new File(filename, path, userId, urlCode, createDate);
        const { file_id } = (await db.query(file.addFile())).rows[0];
        return res.status(200).json({
            message: `File named as ${filename} has been uploaded`,
            file_id,
            shortUrl,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

router.use((err, req, res, next) => {
    return res.status(500).json({
        err: err.message,
    });
});

module.exports = router;

function getDecodeToken(token) {
    const secret = process.env.SECRET;
    return jwt.verify(token, secret);
}
