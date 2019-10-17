const express = require('express');

const db = require('../../db');
const GetFile = require('../../modules/file/getFile.model');

const router = express.Router();

// handles url http://localhost:8081/:url_code/
router.get('/:url_code', async (req, res) => {
    try {
        const { url_code } = req.params;
        const getFile = new GetFile(url_code);
        const { file_exists } = (await db.query(getFile.checkFileByUrlCode())).rows[0];
        if (!file_exists) {
            throw new Error('A file with the same name does not exist.');
        }
        const fileDetails = (await db.query(getFile.getFileByUrlCode())).rows[0];
        return res.status(200).json({
            fileDetails,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;
