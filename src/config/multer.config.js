const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const expansion = path.extname(file.originalname);
        const arrayExpansions = ['.exe', '.bmp', '.php'];
        if (arrayExpansions.some(item => item === expansion)) {
            return cb(new Error(`Files with the ${expansion} extension are prohibited`));
        }
        cb(null, true);
    },
}).single('file');

module.exports = upload;
