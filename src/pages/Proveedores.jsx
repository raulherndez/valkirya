import React, { useState } from 'react';

function Proveedores() {
  // Estado para almacenar la lista de proveedores
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: 'TecnoGlobal S.A.',
      telefono: '+503 2233-4455',
      email: 'ventas@tecnoglobal.com',
    },
    {
      id: 2,
      nombre: 'Distribuidora Central',
      telefono: '+503 7788-9900',
      email: 'info@distribuidora.com',
    },
  ]);

  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  // Estado para controlar si estamos editando un proveedor
  const [editingProveedorId, setEditingProveedorId] = useState(null);

  /**
   * Maneja el envío del formulario para agregar o actualizar un proveedor.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validación básica de campos
    if (!nombre.trim() || !telefono.trim() || !email.trim()) {
      console.log('Por favor, complete todos los campos para el proveedor.');
      return;
    }

    if (editingProveedorId) {
      // Lógica para actualizar un proveedor existente
      setProveedores(
        proveedores.map((prov) =>
          prov.id === editingProveedorId
            ? { ...prov, nombre, telefono, email }
            : prov
        )
      );
      console.log(`Proveedor "${nombre}" actualizado con éxito.`);
      setEditingProveedorId(null); // Sale del modo edición
    } else {
      // Lógica para agregar un nuevo proveedor
      const newId = proveedores.length > 0 ? Math.max(...proveedores.map((p) => p.id)) + 1 : 1;
      const nuevoProveedor = { id: newId, nombre, telefono, email };
      setProveedores([...proveedores, nuevoProveedor]);
      console.log(`Proveedor "${nombre}" agregado con éxito.`);
    }

    // Limpia los campos del formulario
    setNombre('');
    setTelefono('');
    setEmail('');
  };

  /**
   * Prepara el formulario para editar un proveedor.
   * @param {number} id - El ID del proveedor a editar.
   */
  const handleEdit = (id) => {
    const proveedorToEdit = proveedores.find((prov) => prov.id === id);
    if (proveedorToEdit) {
      setNombre(proveedorToEdit.nombre);
      setTelefono(proveedorToEdit.telefono);
      setEmail(proveedorToEdit.email);
      setEditingProveedorId(id); // Establece el ID del proveedor que se está editando
      console.log(`Preparando para editar proveedor: "${proveedorToEdit.nombre}"`);
    }
  };

  /**
   * Elimina un proveedor de la lista.
   * @param {number} id - El ID del proveedor a eliminar.
   */
  const handleDelete = (id) => {
    // En un entorno real, aquí se podría añadir una confirmación visual personalizada.
    console.log(`Intentando eliminar proveedor con ID: ${id}`);
    setProveedores(proveedores.filter((prov) => prov.id !== id));
    console.log('Proveedor eliminado con éxito.');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-blue-200 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-8 border border-gray-100 transform transition-all duration-500 ease-in-out hover:scale-[1.005]">
        {/* Título de la sección */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight drop-shadow-sm">
          <span className="block text-indigo-800">Gestión de</span>
          <span className="block text-blue-700">Proveedores</span>
        </h1>

        {/* Formulario para agregar/editar proveedores */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200"
          onSubmit={handleSubmit}
        >
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="nombre">
              Nombre del Proveedor
            </label>
            <input
              id="nombre"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                         focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500
                         transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Ej. Suministros ABC"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* Campo Teléfono */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="telefono">
              Teléfono
            </label>
            <input
              id="telefono"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                         focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500
                         transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Ej. +503 1234-5678"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* Campo Correo electrónico */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800
                         focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500
                         transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Ej. contacto@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Botón Agregar/Actualizar */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-end">
            <button
              type="submit"
              className={`w-full text-white font-bold py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-offset-white
                         ${editingProveedorId ? 'bg-gradient-to-r from-blue-600 to-indigo-700 focus:ring-blue-500' : 'bg-gradient-to-r from-green-700 to-emerald-800 focus:ring-green-600'}`}
            >
              <span className="flex items-center justify-center gap-2">
                {editingProveedorId ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Actualizar Proveedor
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Proveedor
                  </>
                )}
              </span>
            </button>
            {editingProveedorId && (
              <button
                type="button"
                onClick={() => {
                  setEditingProveedorId(null);
                  setNombre('');
                  setTelefono('');
                  setEmail('');
                }}
                className="w-full mt-2 bg-gray-500 text-white font-bold py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancelar Edición
                </span>
              </button>
            )}
          </div>
        </form>

        {/* Tabla de proveedores */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-semibold text-left">
                <th className="p-4 border-b border-gray-200 rounded-tl-xl">#</th>
                <th className="p-4 border-b border-gray-200">Nombre</th>
                <th className="p-4 border-b border-gray-200">Teléfono</th>
                <th className="p-4 border-b border-gray-200">Correo Electrónico</th>
                <th className="p-4 border-b border-gray-200 rounded-tr-xl text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length > 0 ? (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.id} className="border-t border-gray-100 hover:bg-blue-100 transition duration-150 ease-in-out">
                    <td className="p-4 font-medium text-gray-700">{proveedor.id}</td>
                    <td className="p-4 text-gray-900 font-semibold">{proveedor.nombre}</td>
                    <td className="p-4 text-gray-700 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {proveedor.telefono}
                    </td>
                    <td className="p-4 text-gray-600 italic flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m18 0a2 2 0 00-2-2H5a2 2 0 00-2 2m18 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
                      </svg>
                      {proveedor.email}
                    </td>
                    <td className="p-4 space-x-2 text-center">
                      <button
                        onClick={() => handleEdit(proveedor.id)}
                        className="bg-blue-700 text-white px-3.5 py-1.5 rounded-lg hover:bg-blue-800 transition duration-200 ease-in-out shadow-md"
                      >
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Editar
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(proveedor.id)}
                        className="bg-red-700 text-white px-3.5 py-1.5 rounded-lg hover:bg-red-800 transition duration-200 ease-in-out shadow-md"
                      >
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No hay proveedores registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botón Cerrar Sesión (ajustado para ser más consistente) */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => console.log('Cerrar sesión de proveedores')}
            className="px-8 py-3 bg-gradient-to-r from-red-700 to-rose-800 text-white font-bold rounded-lg
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                       transition duration-300 ease-in-out
                       focus:outline-none focus:ring-3 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white"
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Proveedores;
