// src/pages/Compras.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Compras() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [totalComprado, setTotalComprado] = useState(0);
  const [message, setMessage] = useState('');

  // Cargar productos y proveedores desde Supabase
  useEffect(() => {
    fetchProductos();
    fetchProveedores();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, nombre, precio, stock')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al cargar productos:', error.message);
    } else {
      setProductos(data);
    }
  };

  const fetchProveedores = async () => {
    const { data, error } = await supabase
      .from('proveedores')
      .select('id, nombre')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al cargar proveedores:', error.message);
    } else {
      setProveedores(data);
    }
  };

  const handleSavePurchase = async () => {
    if (!selectedProduct || !selectedProveedor || !precioUnitario || cantidad <= 0) {
      setMessage('Por favor, completa todos los campos correctamente.');
      return;
    }

    const total = cantidad * parseFloat(precioUnitario);

    try {
      // 1. Registrar la compra
      const { error: compraError } = await supabase.from('compras').insert([
        {
          producto_id: selectedProduct,
          proveedor_id: selectedProveedor,
          cantidad,
          precio_unitario: parseFloat(precioUnitario),
          total,
          fecha: new Date().toISOString()
        }
      ]);

      if (compraError) throw compraError;

      // 2. Actualizar el stock del producto
      const producto = productos.find(p => p.id === parseInt(selectedProduct));
      const nuevoStock = producto.stock + cantidad;

      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: nuevoStock })
        .eq('id', selectedProduct);

      if (stockError) throw stockError;

      // 3. Actualizar el total comprado en pantalla
      setTotalComprado(prev => prev + total);
      setMessage(`✅ Compra de ${cantidad} unidad(es) registrada con éxito. Total: $${total.toFixed(2)}`);

      // Reset formulario
      setSelectedProduct('');
      setSelectedProveedor('');
      setCantidad(1);
      setPrecioUnitario('');
      fetchProductos(); // refrescar productos con stock actualizado

    } catch (err) {
      console.error('Error en la compra:', err.message);
      setMessage('❌ Error al registrar la compra.');
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Registrar Compra</h2>

        <div className="space-y-4">
          {/* Producto */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Producto</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedProduct}
              onChange={e => { setSelectedProduct(e.target.value); setMessage(''); }}
            >
              <option value="">Selecciona un producto</option>
              {productos.map(product => (
                <option key={product.id} value={product.id}>
                  {product.nombre} - Stock: {product.stock} - ${parseFloat(product.precio).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Proveedor */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Proveedor</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedProveedor}
              onChange={e => { setSelectedProveedor(e.target.value); setMessage(''); }}
            >
              <option value="">Selecciona un proveedor</option>
              {proveedores.map(prov => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Cantidad */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Cantidad</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Cantidad"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={cantidad}
              onChange={e => { const val = parseInt(e.target.value); setCantidad(val > 0 ? val : 1); setMessage(''); }}
            />
          </div>

          {/* Precio unitario */}
          <div className="space-y-1">
            <label className="block font-semibold text-gray-700">Precio Unitario</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Precio por unidad"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={precioUnitario}
              onChange={e => setPrecioUnitario(e.target.value)}
            />
          </div>

          {message && (
            <p className={`text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleSavePurchase}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition"
          >
            Guardar Compra
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Comprado</h3>
          <p className="text-3xl font-bold text-gray-900">${totalComprado.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
