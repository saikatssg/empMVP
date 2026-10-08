import jwt from 'jsonwebtoken';
import User from '../modules/users/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    // Extract token from the httpOnly cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token validity and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Fetch the user from the database to ensure they still exist and are active
    const currentUser = await User.findById(decoded.userId);
    
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    if (!currentUser.isActive) {
      return res.status(403).json({ message: 'This account has been deactivated.' });
    }

    // Attach user to the request object for use in downstream controllers
    req.user = currentUser;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token.', error: error.message });
  }
};
