// src/pages/Usuarios.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'empleado',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState('');

  // Cargar usuarios desde Supabase
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, email, rol, fecha_creacion')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al cargar usuarios:', error.message);
    } else {
      setUsers(data);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Guardar o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, password, rol } = formData;
    if (!nombre || !email || (!editingUser && !password)) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      if (editingUser) {
        // Actualizar usuario
        const updates = { nombre, email, rol };
        if (password) {
          updates.password = password; // Solo actualizar si se ingresa nueva contraseña
        }

        const { error } = await supabase
          .from('usuarios')
          .update(updates)
          .eq('id', editingUser.id);

        if (error) throw error;

        setMessage('Usuario actualizado con éxito.');
        setEditingUser(null);

      } else {
        // Crear nuevo usuario
        const { error } = await supabase
          .from('usuarios')
          .insert([{ nombre, email, password, rol }]);

        if (error) throw error;

        setMessage('Usuario agregado con éxito.');
      }

      // Reset formulario y recargar lista
      setFormData({ nombre: '', email: '', password: '', rol: 'empleado' });
      fetchUsers();

    } catch (err) {
      console.error('Error al guardar usuario:', err.message);
      setMessage('❌ Error al guardar usuario.');
    }
  };

  // Editar usuario
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({ nombre: user.nombre, email: user.email, password: '', rol: user.rol });
    setMessage('');
  };

  // Eliminar usuario
  const handleDeleteClick = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error al eliminar usuario:', error.message);
      setMessage('❌ Error al eliminar usuario.');
    } else {
      setMessage('Usuario eliminado con éxito.');
      fetchUsers();
    }
  };

  // Función para asignar color a los roles
  const getRoleColor = (rol) => {
    switch (rol) {
      case 'admin': return 'bg-red-600';
      case 'empleado': return 'bg-blue-600';
      case 'invitado': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-8 border border-gray-100">

        <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight drop-shadow-sm">
          Gestión de Usuarios
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold mb-2 text-gray-700">Nombre</label>
            <input id="nombre" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" value={formData.nombre} onChange={handleInputChange} placeholder="Ej. Juan Pérez" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">Correo</label>
            <input id="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" value={formData.email} onChange={handleInputChange} placeholder="Ej. juan@correo.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">Contraseña</label>
            <input id="password" type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" value={formData.password} onChange={handleInputChange} placeholder={editingUser ? "Dejar vacío para no cambiar" : "Contraseña"} />
          </div>
          <div>
            <label htmlFor="rol" className="block text-sm font-semibold mb-2 text-gray-700">Rol</label>
            <select id="rol" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" value={formData.rol} onChange={handleInputChange}>
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
              <option value="invitado">Invitado</option>
            </select>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-end">
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-2.5 rounded-lg">
              {editingUser ? 'Guardar Cambios' : 'Agregar Usuario'}
            </button>
          </div>
        </form>

        {message && <div className={`p-4 rounded-lg text-center ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-semibold text-left">
                <th className="p-4 border-b border-gray-200 rounded-tl-xl">#</th>
                <th className="p-4 border-b border-gray-200">Nombre</th>
                <th className="p-4 border-b border-gray-200">Correo</th>
                <th className="p-4 border-b border-gray-200">Rol</th>
                <th className="p-4 border-b border-gray-200">Fecha Creación</th>
                <th className="p-4 border-b border-gray-200 rounded-tr-xl text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-blue-100 transition duration-150 ease-in-out">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.nombre}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getRoleColor(user.rol)}`}>{user.rol}</span></td>
                  <td className="p-4">{new Date(user.fecha_creacion).toLocaleString()}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => handleEditClick(user)} className="bg-blue-700 text-white px-3 py-1 rounded-lg">Editar</button>
                    <button onClick={() => handleDeleteClick(user.id)} className="bg-red-700 text-white px-3 py-1 rounded-lg">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
