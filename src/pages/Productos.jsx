// src/pages/Productos.jsx
import { useState } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;

    const nuevo = {
      id: productos.length + 1,
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
    };

    setProductos([...productos, nuevo]);
    setForm({ nombre: "", precio: "", stock: "" });
  };

  return (
    <main className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Gestión de Productos
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Nombre del producto</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. Aceite para motor 5W-30"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2">Precio unitario</label>
            <input
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio en USD"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Stock</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Cantidad disponible"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              min="0"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow hover:bg-blue-700 transition"
        >
          Guardar producto
        </button>
      </form>

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300 rounded-2xl shadow">
        <thead className="bg-gray-200 rounded-2xl">
          <tr>
            <th className="p-4 text-left font-semibold">#</th>
            <th className="p-4 text-left font-semibold">Nombre</th>
            <th className="p-4 text-left font-semibold">Precio</th>
            <th className="p-4 text-left font-semibold">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-t border-gray-300 hover:bg-gray-100 transition">
              <td className="p-4">{p.id}</td>
              <td className="p-4">{p.nombre}</td>
              <td className="p-4">${p.precio.toFixed(2)}</td>
              <td className="p-4">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
