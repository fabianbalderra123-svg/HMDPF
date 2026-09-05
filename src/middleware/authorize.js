const { hasMinimumRole } = require('../utils/roles');

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado',
      });
    }

    const isAllowed = allowedRoles.some((role) => hasMinimumRole(req.user.role, role));

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción',
      });
    }

    return next();
  };
}

module.exports = authorize;
