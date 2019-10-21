const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const db = require('../../db/models');
const DeleteFile = require('../../modules/file/deleteFile.model');

const router = express.Router();

// handles url http://localhost:8081/file/delete/
router.delete('/delete', async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const { fileId } = req.body;
        const deleteFile = new DeleteFile(fileId, userId);
        const file = (await db.query(deleteFile.getFileById())).rows[0];
        if (!file) {
            throw new Error('A file with the same name does not exist.');
        }
        await db.query(deleteFile.deleteFile());
        const fileFath = `${__dirname}/../../../storage/${file.file_name}`;
        fs.unlinkSync(fileFath);
        return res.status(200).json({
            message: `File named as ${file.file_name} has been deleted`,
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
