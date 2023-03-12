const Group = require('../models/Group');
const User = require('../models/User');

// Create group
exports.createGroup = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    // Create new group
    const group = await Group.create({ name, members });

    res.json({ group });
  } catch (err) {
    next(err);
  }
};
exports.getAllGroups = async(req, res, next) =>{
    try {
        const groups = await Group.find()
        res.json(groups)
      } catch (err) {
        res.status(500).json({ message: err.message })
        next(err)
      }
};

// Delete group
exports.deleteGroup = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    // Delete group
    const result = await Group.findByIdAndDelete(groupId);
    if (!result) {
      return res.status(400).json({ message: 'Group not found' });
    }

    res.json({ message: 'Group deleted' });
  } catch (err) {
    next(err);
  }
};

// Search groups
exports.searchGroups = async (req, res, next) => {
  try {
    const { query } = req.query;

    // Search groups
    const groups = await Group.find({ name: new RegExp(query, 'i') });

    res.json({ groups });
  } catch (err) {
    next(err);
  }
};

// Add member to group
exports.addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const groupId = req.params.groupId;

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(400).json({ message: 'Group not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Add member to group
    group.members.push(userId);
    await group.save();

    res.json({ group });
  } catch (err) {
    next(err);
  }
};
