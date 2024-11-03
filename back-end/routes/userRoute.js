const express = require("express");
const router = express.Router();

// Testna ruta za korisnike
router.get('/', (req, res) => {
    res.json({ message: 'Users route is working' });
});

module.exports = router;
