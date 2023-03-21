const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        user: user,
        token: token,
        message: 'Login Successful'
      });
      // do password comparison here
      // if password is correct, generate and send a token
      // if password is incorrect, send a 401 response
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
};
exports.logout = (req, res, next) => {
  // perform logout logic here
  // then send a 200 response
  res.status(200).json({
    message: 'Logout successful'
  });
};
