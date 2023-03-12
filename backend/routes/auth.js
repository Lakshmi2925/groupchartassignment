const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.login);
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
  });

module.exports = router;
