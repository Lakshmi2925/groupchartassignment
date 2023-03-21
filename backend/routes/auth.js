const express = require('express');
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/protected', authMiddleware, (req, res) => {
  res.send({ message: 'This route is protected' });
});

module.exports = router;
