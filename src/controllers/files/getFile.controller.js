const express = require('express');

const { Files } = require('./../../models');

const router = express.Router();

// handles url http://localhost:8081/:url_code/
router.get('/:url_code', async (req, res) => {
    try {
        const { url_code } = req.params;
        const fileDetails = (await Files.findAll({ where: { url_code } }))[0];
        if (!fileDetails) {
            throw new Error('A file with the same name does not exist.');
        }
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
