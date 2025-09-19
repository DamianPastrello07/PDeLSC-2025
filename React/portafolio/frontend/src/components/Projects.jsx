import React from "react";

const Projects = ({ projects, isAdmin, onDelete, onEdit }) => {
  return (
    <section id="projects" className="section-padding bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <h2 className="text-center mb-4" data-aos="fade-down">
              Mis Proyectos
              {isAdmin && (
                <button className="btn btn-sm btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                  Añadir
                </button>
              )}
            </h2>
          </div>
        </div>
        <div className="row">
          {projects.map((project, index) => (
            <div key={project._id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="card project-card h-100 shadow">
                <img src={project.image} className="card-img-top" alt={project.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <a href={project.repoUrl} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github me-2"></i>Ver Repo
                  </a>
                  {isAdmin && (
                    <div>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => onEdit(project)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(project._id)}>Eliminar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
