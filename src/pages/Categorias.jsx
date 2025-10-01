import { useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Categoría ejemplo 1" },
    { id: 2, nombre: "Categoría ejemplo 2" },
  ]);
  const [nombre, setNombre] = useState("");

  const agregarCategoria = () => {
    if (nombre.trim() === "") return;
    const nueva = {
      id: categorias.length ? categorias[categorias.length - 1].id + 1 : 1,
      nombre,
    };
    setCategorias([...categorias, nueva]);
    setNombre("");
  };

  const eliminarCategoria = (id) => {
    setCategorias(categorias.filter((cat) => cat.id !== id));
  };

  const editarCategoria = (id) => {
    const nuevaNombre = prompt("Nuevo nombre de la categoría:");
    if (!nuevaNombre) return;
    setCategorias(
      categorias.map((cat) =>
        cat.id === id ? { ...cat, nombre: nuevaNombre } : cat
      )
    );
  };

  return (
    <div className="max-w-3xl w-full rounded-md p-6 bg-gray-300 space-y-8 mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Categorías
      </h1>

      {/* Formulario */}
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <input
          type="text"
          placeholder="Nombre de categoría"
          className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") agregarCategoria();
          }}
        />
        <button
          onClick={agregarCategoria}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition"
        >
          Agregar
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(({ id, nombre }, i) => (
              <tr
                key={id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{nombre}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => editarCategoria(id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
