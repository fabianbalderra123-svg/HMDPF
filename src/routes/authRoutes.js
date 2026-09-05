const express = require('express');
const authService = require('../services/authService');
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const authenticate = require('../middleware/authenticate');
const {
  loginValidators,
  registerValidators,
  changePasswordValidators,
} = require('../validators/authValidators');
const { ROLES } = require('../utils/roles');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post(
  '/login',
  loginValidators,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: result,
    });
  })
);

router.post(
  '/register',
  authenticate,
  authorize(ROLES.ADMIN),
  registerValidators,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { email, password, fullName, role } = req.body;
    const user = await authService.registerUser({ email, password, fullName, role });

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: user,
    });
  })
);

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      data: req.user,
    });
  })
);

router.post(
  '/change-password',
  authenticate,
  changePasswordValidators,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { currentPassword, password } = req.body;
    await authService.changePassword(req.user.id, currentPassword, password);

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente',
    });
  })
);

module.exports = router;
