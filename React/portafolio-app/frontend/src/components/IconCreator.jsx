import { useState, useEffect } from "react";
import api from "../services/api";

export default function IconCreator() {
  const [icons, setIcons] = useState([]);
  const [newIcon, setNewIcon] = useState({
    name: "",
    emoji: "📄",
    componentType: "custom",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedEmojis = ["🌟", "👤", "⚡", "💼", "📞", "📄", "🎨", "🔧", "📊", "❤️"];

  const fetchIcons = async () => {
    try {
      setLoading(true);
      const response = await api.get("/components");
      setIcons(response.data.filter(comp => comp.icon));
    } catch (error) {
      setError("Error al cargar iconos");
      console.error("Error fetching icons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  const handleCreateIcon = async () => {
    try {
      setError("");
      await api.post("/components", {
        type: newIcon.componentType,
        title: newIcon.name,
        content: `Componente ${newIcon.name}`,
        icon: newIcon.emoji,
        isActive: true
      });
      setNewIcon({
        name: "",
        emoji: "📄",
        componentType: "custom",
      });
      fetchIcons();
    } catch (error) {
      setError("Error al crear icono");
      console.error("Error creating icon:", error);
    }
  };

  if (loading) return <div className="p-4">Cargando iconos...</div>;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Creador de Iconos</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      {/* Formulario para crear nuevo icono */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Crear Nuevo Icono</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del Icono</label>
            <input
              type="text"
              value={newIcon.name}
              onChange={(e) => setNewIcon({ ...newIcon, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Mi Nuevo Icono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Componente</label>
            <select
              value={newIcon.componentType}
              onChange={(e) => setNewIcon({ ...newIcon, componentType: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="custom">Personalizado</option>
              <option value="hero">Hero</option>
              <option value="about">About</option>
              <option value="skills">Skills</option>
              <option value="projects">Projects</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Seleccionar Emoji</label>
          <div className="grid grid-cols-5 gap-2">
            {predefinedEmojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => setNewIcon({ ...newIcon, emoji })}
                className={`p-2 text-2xl rounded border-2 ${
                  newIcon.emoji === emoji ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                } hover:border-blue-300`}
              >
                {emoji}
            </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Emoji Personalizado</label>
          <input
            type="text"
            value={newIcon.emoji}
            onChange={(e) => setNewIcon({ ...newIcon, emoji: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="🔧"
            maxLength="2"
          />
        </div>

        <button
          onClick={handleCreateIcon}
          disabled={!newIcon.name}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Crear Icono
        </button>
      </div>

      {/* Vista previa de iconos existentes */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Iconos Existentes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {icons.map(icon => (
            <div key={icon._id} className="text-center p-4 border rounded">
              <div className="text-4xl mb-2">{icon.icon}</div>
              <div className="text-sm font-medium">{icon.title}</div>
              <div className="text-xs text-gray-500">{icon.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
