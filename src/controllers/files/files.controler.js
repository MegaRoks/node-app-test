const express = require('express');
const upload = require('./../../config/multer.config');

const router = express.Router();

// handles url http://localhost:8081/api/files/upload/
router.post('/upload', upload, async (req, res) => {
    try {
        res.send(req.file);
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
