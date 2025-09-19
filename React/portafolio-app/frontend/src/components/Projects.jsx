import React, { useState } from "react";

const Projects = ({ data, isLoggedIn, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const startNewProject = () => {
    setEditingProject(null); setTitle(''); setDescription(''); setGithubUrl(''); setShowEdit(true);
  };

  const editProject = (project) => {
    setEditingProject(project.id); setTitle(project.title); setDescription(project.description); setGithubUrl(project.githubUrl); setShowEdit(true);
  };

  const deleteProject = (id) => onUpdate({ ...data, projects: data.projects.filter(p => p.id !== id) });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProjects = editingProject 
      ? data.projects.map(p => p.id===editingProject ? {id: p.id, title, description, githubUrl} : p)
      : [...data.projects, { id: data.projects.length ? Math.max(...data.projects.map(p=>p.id))+1 : 1, title, description, githubUrl }];
    onUpdate({ ...data, projects: updatedProjects });
    setShowEdit(false);
  };

  return (
    <section id="projects" className="section-padding bg-light">
      <div className="container text-center mb-4">
        <h2>Proyectos</h2>
        {isLoggedIn && <button className="btn btn-success mt-2" onClick={startNewProject}>Nuevo Proyecto</button>}
      </div>
      <div className="row">
        {data.projects.map(project=>(
          <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
            <div className="card h-100 shadow project-card">
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
              </div>
              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">Ver Código</a>
                {isLoggedIn && (
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>editProject(project)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteProject(project.id)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEdit && (
        <div className="edit-overlay">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" rows="3" value={description} onChange={e=>setDescription(e.target.value)} required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">URL de GitHub</label>
              <input type="url" className="form-control" value={githubUrl} onChange={e=>setGithubUrl(e.target.value)} required/>
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={()=>setShowEdit(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Projects;
