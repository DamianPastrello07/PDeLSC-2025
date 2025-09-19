// src/components/Projects.jsx
import React from 'react';

const Projects = ({ data }) => {
  return (
    <section id="projects" className="section-padding bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5 text-center">
            <h2 className="mb-4">Proyectos</h2>
          </div>
        </div>
        <div className="row">
          {data.map((project) => (
            <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
              <div className="card h-100 shadow project-card">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                    <i className="bi bi-github me-2"></i>Ver Código
                  </a>
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
