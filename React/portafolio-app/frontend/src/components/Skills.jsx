import React, { useState, useEffect, useRef } from "react";

const Skills = ({ data, isLoggedIn, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [skillsList, setSkillsList] = useState(data.skills.join(", "));
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), 100*i);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skillsList.split(',').map(s=>s.trim()).filter(s=>s);
    onUpdate({ ...data, skills: skillsArray });
    setShowEdit(false);
  };

  return (
    <section id="skills" className="section-padding" ref={skillsRef}>
      <div className="container text-center mb-4">
        <h2>Habilidades</h2>
        {isLoggedIn && <button className="btn btn-sm btn-outline-primary mt-2" onClick={()=>setShowEdit(true)}>Editar Habilidades</button>}
      </div>
      <div className="row justify-content-center">
        {data.skills.map((skill,i)=>(
          <div className="col-auto mb-3" key={i}>
            <span className="badge bg-primary p-3 fs-6 skill-badge fade-up">{skill}</span>
          </div>
        ))}
      </div>

      {showEdit && (
        <div className="edit-overlay">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3>Editar Habilidades</h3>
            <div className="mb-3">
              <label className="form-label">Lista de habilidades (separadas por comas)</label>
              <textarea className="form-control" rows="4" value={skillsList} onChange={e=>setSkillsList(e.target.value)} required></textarea>
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

export default Skills;
