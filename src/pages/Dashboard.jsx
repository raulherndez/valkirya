// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: 'Productos', value: 0, icon: '📦', color: 'bg-indigo-500', table: 'products' },
    { title: 'Bodegas', value: 0, icon: '🏬', color: 'bg-blue-500', table: 'bodegas' },
    { title: 'Proveedores', value: 0, icon: '🚚', color: 'bg-teal-500', table: 'proveedores' },
    { title: 'Usuarios', value: 0, icon: '👤', color: 'bg-purple-500', table: 'usuarios' },
    { title: 'Punto de Venta', value: 0, icon: '💰', color: 'bg-green-500', table: 'ventas' },
    { title: 'Compras', value: 0, icon: '🧾', color: 'bg-yellow-500', table: 'compras' },
  ]);

  const [actividad, setActividad] = useState([]);

  // Función para contar registros en una tabla
  const fetchCount = async (table) => {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.error(`Error al contar ${table}:`, error.message);
      return 0;
    }
    return count || 0;
  };

  // Cargar estadísticas
  const loadStats = async () => {
    const newStats = await Promise.all(
      stats.map(async (stat) => {
        const value = await fetchCount(stat.table);
        return { ...stat, value };
      })
    );
    setStats(newStats);
  };

  // Cargar actividad reciente (últimas 5 ventas y compras)
  const loadActividad = async () => {
    const { data: ventas, error: errorVentas } = await supabase
      .from('ventas')
      .select('id, producto_id, cantidad, total, fecha')
      .order('fecha', { ascending: false })
      .limit(5);

    const { data: compras, error: errorCompras } = await supabase
      .from('compras')
      .select('id, producto_id, cantidad, total, fecha')
      .order('fecha', { ascending: false })
      .limit(5);

    if (errorVentas) console.error('Error al cargar ventas:', errorVentas.message);
    if (errorCompras) console.error('Error al cargar compras:', errorCompras.message);

    const actividadList = [];

    if (ventas) {
      ventas.forEach(v => {
        actividadList.push(`💰 Venta: Producto ID ${v.producto_id} - Cantidad ${v.cantidad} - Total $${v.total.toFixed(2)}`);
      });
    }

    if (compras) {
      compras.forEach(c => {
        actividadList.push(`🧾 Compra: Producto ID ${c.producto_id} - Cantidad ${c.cantidad} - Total $${c.total.toFixed(2)}`);
      });
    }

    // Ordenar por fecha descendente
    actividadList.sort((a, b) => b.fecha - a.fecha);
    setActividad(actividadList.slice(0, 5));
  };

  useEffect(() => {
    loadStats();
    loadActividad();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema de inventario</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl shadow-lg p-6 bg-white hover:shadow-xl transition duration-300 border-l-4 ${item.color} border-opacity-80`}
          >
            <div className="flex items-center justify-between">
              <div className="text-4xl">{item.icon}</div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Actividad reciente</h2>
        <ul className="space-y-3">
          {actividad.length > 0 ? (
            actividad.map((act, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                {act}
              </li>
            ))
          ) : (
            <li className="bg-white p-4 rounded-lg shadow text-gray-500">No hay actividad reciente</li>
          )}
        </ul>
      </div>
    </div>
  );
}

