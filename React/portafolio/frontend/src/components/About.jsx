import React from 'react';

export default function About({ about, setAbout, adminLogged }) {

  const editAbout = () => {
    if (!adminLogged) return;
    const newText = prompt("Editar información 'Sobre Mí':", about.text);
    if (newText && newText.trim() !== '') {
      setAbout({...about, text: newText});
    }
  };

  return (
    <section id="about" className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 data-aos="fade-down">
            Sobre Mí
            {adminLogged && <button className="btn btn-sm btn-primary ms-2" onClick={editAbout}>Editar</button>}
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-6" data-aos="fade-right">
            <img src={about.image} alt="Mi foto" className="img-fluid rounded shadow"/>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <p className="lead mb-4">{about.text}</p>
            <p>{about.details}</p>
            <a href="#projects" className="btn btn-primary mt-3">Ver mis proyectos</a>
          </div>
        </div>
      </div>
    </section>
  );
}
