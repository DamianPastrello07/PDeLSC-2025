import React from "react";

const Hero = ({ hero }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="container text-center text-white">
        <h1 className="display-3 fw-bold" data-aos="fade-down">{hero.title}</h1>
        <h2 className="h3 mb-5" data-aos="fade-up" data-aos-delay="200">{hero.subtitle}</h2>
        <p className="lead mb-5" data-aos="fade-up" data-aos-delay="400">{hero.description}</p>
        <div data-aos="fade-up" data-aos-delay="600">
          <a href="#about" className="btn btn-outline-light btn-lg px-4 me-2">Conóceme</a>
          <a href="#projects" className="btn btn-light btn-lg px-4">Ver Proyectos</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
