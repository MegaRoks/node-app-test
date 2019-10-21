const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../../db/models');
const ListFile = require('../../modules/file/list.model');

const router = express.Router();

// handles url http://localhost:8081/files/list/
router.get('/list', async (req, res) => {
    try {
        const { userId } = await getDecodedToken(req.headers.token);
        const listFile = new ListFile(userId);
        const filesList = (await db.query(listFile.getFilesByUserID())).rows;
        return res.status(200).json({
            filesList,
        });
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;

function getDecodedToken(token) {
    const secret = process.env.SECRET;
    return jwt.verify(token, secret);
}
