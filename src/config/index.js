require('dotenv').config();

const requiredEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Variable de entorno requerida: ${key}`);
  }
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  initialAdmin: {
    email: process.env.INITIAL_ADMIN_EMAIL || 'admin@hmdpf.com',
    password: process.env.INITIAL_ADMIN_PASSWORD || 'Admin123!',
    fullName: process.env.INITIAL_ADMIN_NAME || 'Administrador',
  },
};
