const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { Files } = require('./../../db/models');

const router = express.Router();

// handles url http://localhost:8081/file/delete/
router.delete('/delete', async (req, res) => {
    try {
        const { userId } = getDecodedToken(req.headers.token);
        const { fileId } = req.body;
        const file = (await Files.findAll({ where: { file_id: fileId } }))[0];
        if (!file) {
            throw new Error('A file with the same name does not exist.');
        }
        await Files.destroy({
            where: {
                file_id: fileId,
                user_id: userId,
            },
        });
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

module.exports = router;

function getDecodedToken(token) {
    const secret = process.env.SECRET;
    return jwt.verify(token, secret);
}
