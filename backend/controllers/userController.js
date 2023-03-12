const bcrypt = require('bcrypt');
const User = require('../models/User');

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isAdmin });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Edit user
exports.editUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update user
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    await user.save();

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
