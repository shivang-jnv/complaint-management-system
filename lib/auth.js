import jwt from 'jsonwebtoken';
import dbConnect from './mongodb';
const User = require('./models/User');

export const authenticate = (handler) => async (req, res) => {
  await dbConnect();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export const authorize = (roles = []) => (handler) => (req, res) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  return handler(req, res);
}; 