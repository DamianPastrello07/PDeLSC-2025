import React from "react";

const Skills = ({ skills, isAdmin, onDelete }) => {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <h2 className="text-center mb-4" data-aos="fade-down">
              Mis Habilidades
              {isAdmin && (
                <button className="btn btn-sm btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#addSkillModal">
                  Añadir
                </button>
              )}
            </h2>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12 d-flex flex-wrap justify-content-center">
            {skills.map((skill, index) => (
              <div key={skill._id} className="skills-badge" data-aos="fade-up" data-aos-delay={index * 100}>
                <span className={`badge bg-${skill.color} skills-badge`}>
                  {skill.name}
                  {isAdmin && (
                    <span className="ms-2 badge bg-light text-dark" onClick={() => onDelete(skill._id)}>
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
