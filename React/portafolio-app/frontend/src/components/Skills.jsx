// src/components/Skills.jsx
import React, { useEffect, useRef } from 'react';

const Skills = ({ data }) => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.fade-up');
          elements.forEach((el, index) => {
            setTimeout(() => el.classList.add('show'), 100 * index);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
    };
  }, []);

  return (
    <section id="skills" className="section-padding" ref={skillsRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5 text-center">
            <h2 className="mb-4">Habilidades</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          {data.map((skill, index) => (
            <div className="col-auto mb-3" key={index}>
              <span className="badge bg-primary p-3 me-2 fs-6 skill-badge fade-up">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
