// src/pages/PuntoVenta.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function PuntoVenta() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalSold, setTotalSold] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProductos();
    fetchTotalSold();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al cargar productos:', error.message);
    } else {
      setProductos(data);
    }
  };

  const fetchTotalSold = async () => {
    const { data, error } = await supabase
      .from('ventas')
      .select('total');

    if (error) {
      console.error('Error al calcular total vendido:', error.message);
    } else {
      const total = data.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
      setTotalSold(total);
    }
  };

  const handleSell = async () => {
    if (!selectedProduct) {
      setMessage('Por favor, selecciona un producto.');
      return;
    }
    if (quantity <= 0) {
      setMessage('La cantidad debe ser mayor que cero.');
      return;
    }

    const product = productos.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    if (quantity > product.stock) {
      setMessage(`No hay suficiente stock. Solo quedan ${product.stock} unidades.`);
      return;
    }

    const saleAmount = quantity * parseFloat(product.precio);

    // Registrar venta en Supabase
    const { error } = await supabase
      .from('ventas')
      .insert([{ producto_id: product.id, cantidad: quantity, total: saleAmount }]);

    if (error) {
      console.error('Error al registrar venta:', error.message);
      setMessage('Error al registrar venta.');
    } else {
      // Actualizar stock del producto
      await supabase
        .from('products')
        .update({ stock: product.stock - quantity })
        .eq('id', product.id);

      setTotalSold(prev => prev + saleAmount);
      setMessage(`Venta de ${quantity} unidades de "${product.nombre}" registrada por $${saleAmount.toFixed(2)}.`);

      setSelectedProduct('');
      setQuantity(1);
      fetchProductos(); // refrescar productos con stock actualizado
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6 font-inter">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Punto de Venta</h2>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="producto" className="block font-semibold text-gray-700">Producto</label>
            <select
              id="producto"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
            >
              <option value="">Selecciona un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - ${parseFloat(p.precio).toFixed(2)} - Stock: {p.stock}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="cantidad" className="block font-semibold text-gray-700">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              step="1"
              placeholder="Ej: 2"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
            />
          </div>

          {message && (
            <p className={`text-center text-sm ${message.includes('registrada') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleSell}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl transition"
          >
            Registrar Venta
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total vendido</h3>
          <p className="text-3xl font-bold text-gray-900">${totalSold.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
