const express = require('express');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const { Files } = require('./../../models');
const upload = require('../../config/multer.config');

const router = express.Router();

// handles url http://localhost:8081/file/add/
router.post('/add', upload, async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const { filename, path } = req.file;
        const urlCode = shortid.generate();
        const file = (await Files.findAll({ where: { file_name: filename } }))[0];
        if (file) {
            throw new Error('A file with the same name already exists.');
        }
        const { file_id } = await Files.create({
            file_name: filename,
            file_path: path,
            user_id: userId,
            url_code: urlCode,
        });
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
