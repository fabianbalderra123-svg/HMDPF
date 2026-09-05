const userService = require('./userService');
const { hashPassword, comparePassword } = require('../lib/password');
const { signToken } = require('../lib/jwt');
const { sanitizeUser, ROLES } = require('../utils/roles');
const config = require('../config');

async function login(email, password) {
  const user = await userService.findByEmail(email);

  if (!user || !user.is_active) {
    const error = new userService.AppError('Credenciales inválidas', 401);
    throw error;
  }

  const isValid = await comparePassword(password, user.password_hash);

  if (!isValid) {
    throw new userService.AppError('Credenciales inválidas', 401);
  }

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
}

async function registerUser({ email, password, fullName, role = ROLES.VIEWER }) {
  const existing = await userService.findByEmail(email);
  if (existing) {
    throw new userService.AppError('El correo electrónico ya está registrado', 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await userService.create({
    email: email.toLowerCase(),
    password_hash: passwordHash,
    full_name: fullName,
    role,
    is_active: true,
  });

  return sanitizeUser(user);
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await userService.findById(userId);
  if (!user) {
    throw new userService.AppError('Usuario no encontrado', 404);
  }

  const isValid = await comparePassword(currentPassword, user.password_hash);
  if (!isValid) {
    throw new userService.AppError('Contraseña actual incorrecta', 400);
  }

  const passwordHash = await hashPassword(newPassword);
  await userService.update(userId, { password_hash: passwordHash });
}

async function seedInitialAdmin() {
  const adminCount = await userService.countAdmins();

  if (adminCount > 0) {
    return null;
  }

  const { email, password, fullName } = config.initialAdmin;
  const passwordHash = await hashPassword(password);

  const admin = await userService.create({
    email: email.toLowerCase(),
    password_hash: passwordHash,
    full_name: fullName,
    role: ROLES.ADMIN,
    is_active: true,
  });

  console.log(`[Seed] Admin inicial creado: ${admin.email}`);
  return sanitizeUser(admin);
}

module.exports = {
  login,
  registerUser,
  changePassword,
  seedInitialAdmin,
};
