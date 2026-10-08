export const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    // SuperAdmins bypass all checks
    if (req.user.role === 'SuperAdmin' || req.user.role === 'Admin') {
      return next();
    }

    // Check if the user has the specific granular permission
    if (req.user.permissions && !req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ 
        message: 'Security Alert: You lack the privileges required to perform this action.' 
      });
    }
    
    next();
  };
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is populated by the protectRoute middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Your role (${req.user?.role}) lacks permissions for this action.` 
      });
    }
    
    next();
  };
};
