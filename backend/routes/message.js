const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
// const auth = require('../middleware/auth');

// Send message in group
router.post('/:groupId', messageController.sendMessage);

// Like message
router.post('/:groupId/messages/:messageId/like', messageController.likeMessage);

module.exports = router;
