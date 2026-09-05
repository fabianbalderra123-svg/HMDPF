const express = require('express');
const userService = require('../services/userService');
const { hashPassword } = require('../lib/password');
const { sanitizeUser, ROLES } = require('../utils/roles');
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  listUsersValidators,
  updateUserValidators,
  userIdValidator,
} = require('../validators/authValidators');

const router = express.Router();

router.use(authenticate);
router.use(authorize(ROLES.EDITOR));

router.get(
  '/',
  listUsersValidators,
  validateRequest,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { role, search } = req.query;
    const isActive = req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined;

    const result = await userService.list({ page, limit, role, isActive, search });

    res.json({
      success: true,
      data: {
        users: result.users.map(sanitizeUser),
        pagination: result.pagination,
      },
    });
  })
);

router.get(
  '/:id',
  userIdValidator,
  validateRequest,
  asyncHandler(async (req, res) => {
    const user = await userService.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.json({
      success: true,
      data: sanitizeUser(user),
    });
  })
);

router.put(
  '/:id',
  authorize(ROLES.ADMIN),
  updateUserValidators,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { email, fullName, role, isActive, password } = req.body;
    const updates = {};

    if (email !== undefined) updates.email = email;
    if (fullName !== undefined) updates.full_name = fullName;
    if (role !== undefined) updates.role = role;
    if (isActive !== undefined) updates.is_active = isActive;
    if (password) updates.password_hash = await hashPassword(password);

    const user = await userService.update(req.params.id, updates);

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: sanitizeUser(user),
    });
  })
);

router.delete(
  '/:id',
  authorize(ROLES.ADMIN),
  userIdValidator,
  validateRequest,
  asyncHandler(async (req, res) => {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'No puedes eliminar tu propia cuenta',
      });
    }

    await userService.remove(req.params.id);

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  })
);

module.exports = router;
