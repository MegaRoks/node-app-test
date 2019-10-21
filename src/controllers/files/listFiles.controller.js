const express = require('express');
const jwt = require('jsonwebtoken');

const { Files } = require('./../../db/models');

const router = express.Router();

// handles url http://localhost:8081/files/list/
router.get('/list', async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const filesList = await Files.findAll({ where: { user_id: userId } });
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
