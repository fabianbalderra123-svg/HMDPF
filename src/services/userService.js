const supabase = require('../lib/supabase');

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function findByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error) throw new AppError('Error al consultar usuario', 500);
  return data;
}

async function findById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new AppError('Error al consultar usuario', 500);
  return data;
}

async function list({ page = 1, limit = 10, role, isActive, search }) {
  const offset = (page - 1) * limit;

  let query = supabase
    .from('users')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (role) query = query.eq('role', role);
  if (typeof isActive === 'boolean') query = query.eq('is_active', isActive);
  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) throw new AppError('Error al listar usuarios', 500);

  return {
    users: data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

async function create(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new AppError('El correo electrónico ya está registrado', 409);
    }
    throw new AppError('Error al crear usuario', 500);
  }

  return data;
}

async function update(id, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new AppError('El correo electrónico ya está registrado', 409);
    }
    throw new AppError('Error al actualizar usuario', 500);
  }

  if (!data) throw new AppError('Usuario no encontrado', 404);
  return data;
}

async function remove(id) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
    .select('id')
    .single();

  if (error) throw new AppError('Error al eliminar usuario', 500);
  if (!data) throw new AppError('Usuario no encontrado', 404);
  return data;
}

async function countAdmins() {
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin');

  if (error) throw new AppError('Error al contar administradores', 500);
  return count || 0;
}

module.exports = {
  AppError,
  findByEmail,
  findById,
  list,
  create,
  update,
  remove,
  countAdmins,
};
