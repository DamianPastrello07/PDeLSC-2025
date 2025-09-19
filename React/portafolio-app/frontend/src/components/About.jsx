import React, { useState, useEffect, useRef } from "react";

const About = ({ data, isLoggedIn, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(data.about.title);
  const [content, setContent] = useState(data.about.content);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.slide-in-left').forEach(el => el.classList.add('show'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => { if (aboutRef.current) observer.unobserve(aboutRef.current); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...data, about: { title, content } });
    setShowEdit(false);
  };

  return (
    <section id="about" className="section-padding bg-light" ref={aboutRef}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="slide-in-left" onClick={() => isLoggedIn && setShowEdit(true)}>{data.about.title}</h2>
          <p className="lead slide-in-left" onClick={() => isLoggedIn && setShowEdit(true)}>{data.about.content}</p>
        </div>

        {showEdit && (
          <div className="edit-overlay">
            <form className="edit-form" onSubmit={handleSubmit}>
              <h3>Editar Sobre Mí</h3>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contenido</label>
                <textarea className="form-control" rows="5" value={content} onChange={e=>setContent(e.target.value)} required></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => setShowEdit(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
