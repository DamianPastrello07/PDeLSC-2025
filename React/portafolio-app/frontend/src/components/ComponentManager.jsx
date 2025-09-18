import { useEffect, useState } from "react";
import api from "../services/api";

export default function ComponentManager() {
  const [components, setComponents] = useState([]);
  const [editingComponent, setEditingComponent] = useState(null);
  const [newComponent, setNewComponent] = useState({
    type: "custom",
    title: "",
    content: "",
    icon: "📄",
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const componentTypes = [
    { value: "hero", label: "Hero", icon: "🌟" },
    { value: "about", label: "About", icon: "👤" },
    { value: "skills", label: "Skills", icon: "⚡" },
    { value: "projects", label: "Projects", icon: "💼" },
    { value: "contact", label: "Contact", icon: "📞" },
    { value: "custom", label: "Custom", icon: "📄" }
  ];

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/components");
      setComponents(response.data);
    } catch (error) {
      setError("Error al cargar componentes");
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleCreate = async () => {
    try {
      setError("");
      await api.post("/components", newComponent);
      setNewComponent({
        type: "custom",
        title: "",
        content: "",
        icon: "📄",
        isActive: true
      });
      fetchComponents();
    } catch (error) {
      setError("Error al crear componente");
      console.error("Error creating component:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setError("");
      await api.put(`/components/${editingComponent._id}`, editingComponent);
      setEditingComponent(null);
      fetchComponents();
    } catch (error) {
      setError("Error al actualizar componente");
      console.error("Error updating component:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este componente?")) return;
    try {
      setError("");
      await api.delete(`/components/${id}`);
      fetchComponents();
    } catch (error) {
      setError("Error al eliminar componente");
      console.error("Error deleting component:", error);
    }
  };

  if (loading) return <div className="p-4">Cargando componentes...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Componentes</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      {/* Formulario para crear nuevo componente */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Crear Nuevo Componente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={newComponent.type}
              onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {componentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icono</label>
            <input
              type="text"
              value={newComponent.icon}
              onChange={(e) => setNewComponent({ ...newComponent, icon: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="📄"
              maxLength="2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={newComponent.title}
              onChange={(e) => setNewComponent({ ...newComponent, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Título del componente"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Contenido</label>
            <textarea
              value={newComponent.content}
              onChange={(e) => setNewComponent({ ...newComponent, content: e.target.value })}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Contenido del componente"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Componente
        </button>
      </div>

      {/* Lista de componentes existentes */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Componentes Existentes</h3>
        <div className="space-y-3">
          {components.map(component => (
            <div key={component._id} className="border p-3 rounded">
              {editingComponent?._id === component._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingComponent.title}
                    onChange={(e) => setEditingComponent({ ...editingComponent, title: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editingComponent.content}
                    onChange={(e) => setEditingComponent({ ...editingComponent, content: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows="2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingComponent(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{component.icon}</span>
                    <div>
                      <h4 className="font-semibold">{component.title}</h4>
                      <p className="text-sm text-gray-600">{component.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingComponent(component)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(component._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
