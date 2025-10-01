// src/components/AppLayout.jsx
import React, { useState } from 'react';
import Dashboard from '../pages/Dashboard';
import Productos from '../pages/Productos';
import Bodega from '../pages/Bodega';
import Categorias from '../pages/Categorias';
import Proveedores from '../pages/Proveedores';
import Usuarios from '../pages/Usuarios';
import PuntoVenta from '../pages/PuntoVenta';
import Compras from '../pages/Compras';

export default function AppLayout() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const navItems = [
    'Dashboard',
    'Productos',
    'Bodegas',
    'Categorías',
    'Proveedores',
    'Usuarios',
    'Punto de Venta',
    'Compras'
  ];

  const renderSection = () => {
    switch (activeLink) {
      case 'Dashboard': return <Dashboard />;
      case 'Productos': return <Productos />;
      case 'Bodegas': return <Bodega />;
      case 'Categorías': return <Categorias />;
      case 'Proveedores': return <Proveedores />;
      case 'Usuarios': return <Usuarios />;
      case 'Punto de Venta': return <PuntoVenta />;
      case 'Compras': return <Compras />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 to-blue-200 font-sans antialiased">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-800 to-blue-700 text-white p-6 shadow-xl flex-col hidden md:flex rounded-r-xl fixed h-full overflow-y-auto">
        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="bg-white text-indigo-700 rounded-full p-4 shadow-lg mb-3 text-4xl transform hover:scale-110 transition-transform duration-300">
            📦
          </div>
          <h2 className="text-3xl font-extrabold text-center tracking-tight text-white drop-shadow-md">
            InventarioApp
          </h2>
        </div>

        <nav className="flex flex-col space-y-3 flex-grow">
          {navItems.map((label) => (
            <button
              key={label}
              onClick={() => setActiveLink(label)}
              className={`nav-link flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:shadow-lg hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700 text-indigo-100 ${activeLink === label ? 'active bg-white text-indigo-800 shadow-lg transform scale-105' : ''}`}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-indigo-600 my-8 w-full"></div>

        <div className="flex flex-col items-center pb-4">
          <p className="mt-2 text-sm text-center font-medium text-indigo-200">
            Bienvenido, <span className="font-semibold text-white">UsuarioEjemplo</span>
          </p>
          <button
            onClick={() => console.log('Cerrar sesión')}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-100 to-blue-100 transition-all duration-500 ease-in-out md:ml-64 overflow-x-auto flex items-center justify-center">
        <div className="w-full max-w-6xl flex justify-center items-center">
          <div className="p-8 md:p-12 lg:p-16 shadow-2xl rounded-xl bg-white flex flex-col items-center justify-center w-full min-h-[60vh] overflow-hidden transform transition-all duration-500 ease-in-out hover:scale-[1.005]">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
}
