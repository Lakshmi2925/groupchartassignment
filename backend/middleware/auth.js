const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
