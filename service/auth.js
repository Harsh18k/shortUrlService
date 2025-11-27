const jwt = require('jsonwebtoken');

// ✅ Secret from .env
const secret = process.env.JWT_SECRET;

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = { setUser, getUser };