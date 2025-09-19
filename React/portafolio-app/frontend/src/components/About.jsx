// src/components/About.jsx
import React, { useEffect, useRef } from 'react';

const About = ({ data }) => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.slide-in-left');
          elements.forEach(el => el.classList.add('show'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-light" ref={aboutRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5">
            <h2 className="text-center mb-4 slide-in-left">{data.title}</h2>
            <p className="lead slide-in-left">{data.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
