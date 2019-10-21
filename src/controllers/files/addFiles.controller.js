const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const db = require('../../db');
const File = require('../../modules/file/addFile.model');
const upload = require('../../config/multer.config');

const router = express.Router();

// handles url http://localhost:8081/file/add/
router.post('/add', upload, async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const createDate = moment().format();
        const { filename, path } = req.file;
        const urlCode = shortid.generate();
        const file = new File(filename, path, userId, urlCode, createDate);
        const { file_exists } = (await db.query(file.getFileByFileName())).rows[0];
        if (file_exists) {
            throw new Error('A file with the same name already exists.');
        }
        const { file_id } = (await db.query(file.addFile())).rows[0];
        return res.status(200).json({
            message: `File named as ${filename} has been uploaded`,
            file_id,
            urlCode,
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

function getDecodedToken(token) {
    const secret = process.env.SECRET;
    return jwt.verify(token, secret);
}
