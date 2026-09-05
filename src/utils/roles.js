const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.EDITOR]: 2,
  [ROLES.VIEWER]: 1,
};

function hasMinimumRole(userRole, requiredRole) {
  return (ROLE_HIERARCHY[userRole] || 0) >= (ROLE_HIERARCHY[requiredRole] || 0);
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password_hash, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  ROLES,
  ROLE_HIERARCHY,
  hasMinimumRole,
  sanitizeUser,
};
