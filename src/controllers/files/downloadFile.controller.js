const express = require('express');

const { Files } = require('./../../db/models');

const router = express.Router();

// handles url http://localhost:8081/file/download/:url_code/
router.get('/download/:url_code/', async (req, res) => {
    try {
        const { url_code } = req.params;
        const { file_name } = (await Files.findAll({ where: { url_code } }))[0];
        await Files.increment('count_downloads', { where: { url_code } });
        const file = `${__dirname}/../../../storage/${file_name}`;
        res.download(file);
    } catch (err) {
        return res.status(422).json({
            err: err.message,
        });
    }
});

module.exports = router;
