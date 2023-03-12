const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Create group
router.post('/', groupController.createGroup);

// Delete group
router.delete('/:groupId', groupController.deleteGroup);

// Search groups
router.get('/search', groupController.searchGroups);
// get All groups
router.get('/groups', groupController.getAllGroups);

// Add member to group
router.post('/:groupId/members', groupController.addMember);

module.exports = router;
