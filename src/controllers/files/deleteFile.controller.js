const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const db = require('../../db');
const DeleteFile = require('../../modules/file/deleteFile.model');

const router = express.Router();

// handles url http://localhost:8081/file/delete/
router.delete('/delete', async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const { fileId } = req.body;
        const deleteFile = new DeleteFile(fileId, userId);
        const { file_name } = (await db.query(deleteFile.getFileById())).rows[0];
        if (!file_name) {
            throw new Error('A file with the same name does not exist.');
        }
        const { file_id } = (await db.query(deleteFile.deleteFile())).rows[0];
        const file = `${__dirname}/../../../storage/${file_name}`;
        fs.unlinkSync(file);
        return res.status(200).json({
            message: `File named as ${file_name} has been deleted`,
            file_id,
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
