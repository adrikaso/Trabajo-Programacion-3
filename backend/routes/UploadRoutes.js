const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

router.post('/upload', upload.single('picture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    const pictureURL = `/uploads/${req.file.filename}`;
    res.status(200).json({ pictureURL });
});

module.exports = router;