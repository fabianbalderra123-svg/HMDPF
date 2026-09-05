const { body, param, query } = require('express-validator');
const { ROLES } = require('../utils/roles');

const emailValidator = body('email')
  .trim()
  .isEmail()
  .withMessage('Correo electrónico inválido')
  .normalizeEmail();

const passwordValidator = body('password')
  .isLength({ min: 8 })
  .withMessage('La contraseña debe tener al menos 8 caracteres')
  .matches(/[A-Z]/)
  .withMessage('La contraseña debe incluir al menos una mayúscula')
  .matches(/[a-z]/)
  .withMessage('La contraseña debe incluir al menos una minúscula')
  .matches(/[0-9]/)
  .withMessage('La contraseña debe incluir al menos un número');

const loginValidators = [
  emailValidator,
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];

const registerValidators = [
  emailValidator,
  passwordValidator,
  body('fullName').trim().notEmpty().withMessage('El nombre completo es requerido'),
  body('role')
    .optional()
    .isIn([ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER])
    .withMessage('Rol inválido'),
];

const changePasswordValidators = [
  body('currentPassword').notEmpty().withMessage('La contraseña actual es requerida'),
  passwordValidator,
];

const updateUserValidators = [
  param('id').isUUID().withMessage('ID de usuario inválido'),
  body('email').optional().trim().isEmail().withMessage('Correo electrónico inválido').normalizeEmail(),
  body('fullName').optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
  body('role')
    .optional()
    .isIn([ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER])
    .withMessage('Rol inválido'),
  body('isActive').optional().isBoolean().withMessage('isActive debe ser booleano'),
  body('password').optional().custom((value) => {
    if (!value) return true;
    if (value.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres');
    if (!/[A-Z]/.test(value)) throw new Error('La contraseña debe incluir al menos una mayúscula');
    if (!/[a-z]/.test(value)) throw new Error('La contraseña debe incluir al menos una minúscula');
    if (!/[0-9]/.test(value)) throw new Error('La contraseña debe incluir al menos un número');
    return true;
  }),
];

const userIdValidator = [param('id').isUUID().withMessage('ID de usuario inválido')];

const listUsersValidators = [
  query('page').optional().isInt({ min: 1 }).withMessage('page debe ser un entero positivo'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit debe estar entre 1 y 100'),
  query('role')
    .optional()
    .isIn([ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER])
    .withMessage('Rol inválido'),
  query('isActive').optional().isIn(['true', 'false']).withMessage('isActive debe ser true o false'),
  query('search').optional().trim().isLength({ max: 100 }).withMessage('Búsqueda demasiado larga'),
];

module.exports = {
  loginValidators,
  registerValidators,
  changePasswordValidators,
  updateUserValidators,
  userIdValidator,
  listUsersValidators,
};
