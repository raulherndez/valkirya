import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout general
import AppLayout from './components/AppLayout';

// Páginas
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Bodega from './pages/Bodega';
import Proveedores from './pages/Proveedores';
import Compras from './pages/Compras';
import PuntoVenta from './pages/PuntoVenta';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Redirección inicial */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Rutas del sistema */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route path="bodega" element={<Bodega />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="compras" element={<Compras />} />
          <Route path="punto-venta" element={<PuntoVenta />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
