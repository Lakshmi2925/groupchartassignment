const Group = require('../models/Group');
const Message = require('../models/Message');
const User = require('../models/User');

// Send message in group
exports.sendMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(400).json({ message: 'Group not found' });
    }

    // Create new message
    const message = await Message.create({ text, group: groupId, user: userId });

    // Add message to group
    group.messages.push(message._id);
    await group.save();

    res.json({ message });
  } catch (err) {
    next(err);
  }
};

// Like message
exports.likeMessage = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const userId = req.user.id;

    // Check if message exists
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(400).json({ message: 'Message not found' });
    }

    // Check if user has already liked the message
    if (message.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this message' });
    }

    // Add like to message
    message.likes.push(userId);
    await message.save();

    res.json({ message });
  } catch (err) {
    next(err);
  }
};
