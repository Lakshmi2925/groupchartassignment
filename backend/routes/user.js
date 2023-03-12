const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user
router.post('/', userController.createUser);

// Edit user
router.put('/:userId', userController.editUser);

module.exports = router;
