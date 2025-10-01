import { supabase } from '../supabaseClient';
import React, { useEffect, useState } from 'react';

export default function Bodegas() {
  const [bodegas, setBodegas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  // Cargar bodegas
  const fetchBodegas = async () => {
    const { data, error } = await supabase
      .from('bodegas')       // nombre exacto de la tabla
      .select('*')
      .order('id', { ascending: true });

    if (error) console.error('Error al cargar bodegas:', error.message);
    else setBodegas(data);
  };

  useEffect(() => {
    fetchBodegas();
  }, []);

  // Agregar bodega
  const handleAddBodega = async (e) => {
    e.preventDefault();
    if (!nombre) return alert('Nombre obligatorio');

    const { error } = await supabase
      .from('bodegas')
      .insert([{ nombre, direccion }]);

    if (error) console.error('Error al agregar bodega:', error.message);
    else {
      setNombre('');
      setDireccion('');
      fetchBodegas();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gestión de Bodegas</h1>

      <form onSubmit={handleAddBodega} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          className="w-full border p-2 rounded"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Bodega
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Dirección</th>
          </tr>
        </thead>
        <tbody>
          {bodegas.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.id}</td>
              <td className="border p-2">{b.nombre}</td>
              <td className="border p-2">{b.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
