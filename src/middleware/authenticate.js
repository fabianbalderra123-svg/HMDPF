const { verifyToken } = require('../lib/jwt');
const userService = require('../services/userService');
const { sanitizeUser } = require('../utils/roles');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token de autenticación requerido',
    });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = verifyToken(token);
    const user = await userService.findById(decoded.sub);

    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autorizado o inactivo',
      });
    }

    req.user = sanitizeUser(user);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
}

module.exports = authenticate;
