// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Layout general
import AppLayout from './components/AppLayout';

// Páginas individuales
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Bodega from './pages/Bodega';
import Proveedores from './pages/Proveedores';
import Compras from './pages/Compras';
import PuntoVenta from './pages/PuntoVenta';
import Usuarios from './pages/Usuarios';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Redirige a /dashboard si accede a la raíz */}
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
  </React.StrictMode>
);

