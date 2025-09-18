import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", link: "", image: "" });
  const [editId, setEditId] = useState(null); // id del proyecto en edición

  const fetchProjects = () => {
    axios.get("https://p-de-isc-back.vercel.app/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleAdd = () => {
    axios.post("https://p-de-isc-back.vercel.app/api/projects", newProject)
      .then(() => { 
        fetchProjects(); 
        setNewProject({ title: "", description: "", link: "", image: "" }); 
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`https://p-de-isc-back.vercel.app/api/projects/${id}`)
      .then(() => fetchProjects())
      .catch(err => console.error(err));
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setNewProject({ title: project.title, description: project.description, link: project.link, image: project.image });
  };

  const handleUpdate = () => {
    axios.put(`https://p-de-isc-back.vercel.app/api/projects/${editId}`, newProject)
      .then(() => { 
        fetchProjects(); 
        setEditId(null); 
        setNewProject({ title: "", description: "", link: "", image: "" }); 
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
      
      <div className="mb-6 space-y-2">
        <input placeholder="Título" className="border p-2 w-full" 
          value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })}/>
        <input placeholder="Descripción" className="border p-2 w-full" 
          value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}/>
        <input placeholder="Link" className="border p-2 w-full" 
          value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })}/>
        <input placeholder="Imagen URL" className="border p-2 w-full" 
          value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })}/>
        
        {editId ? (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Actualizar</button>
        ) : (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Agregar</button>
        )}
      </div>

      <ul>
        {projects.map(p => (
          <li key={p._id} className="flex justify-between items-center border p-2 mb-2">
            <span>{p.title}</span>
            <div className="space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(p)}>Editar</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


