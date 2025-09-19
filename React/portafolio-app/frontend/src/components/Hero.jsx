import React, { useState, useEffect, useRef } from "react";

const Hero = ({ data, isLoggedIn, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(data.hero.title);
  const [subtitle, setSubtitle] = useState(data.hero.subtitle);
  const heroRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.fade-in');
        elements.forEach(el => el.classList.add('show'));
      }
    }, 200);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...data, hero: { title, subtitle } });
    setShowEdit(false);
  };

  return (
    <section id="hero" className="hero-section bg-primary text-white" ref={heroRef}>
      <div className="container text-center">
        <h1 className="display-3 fw-bold fade-in" onClick={() => isLoggedIn && setShowEdit(true)}>
          {data.hero.title}
        </h1>
        <p className="lead fade-in">{data.hero.subtitle}</p>

        {showEdit && (
          <div className="edit-overlay">
            <form className="edit-form" onSubmit={handleSubmit}>
              <h3>Editar Hero</h3>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Subtítulo</label>
                <input type="text" className="form-control" value={subtitle} onChange={e=>setSubtitle(e.target.value)} required />
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

export default Hero;
