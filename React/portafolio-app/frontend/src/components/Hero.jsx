// src/components/Hero.jsx
import React, { useEffect, useState, useRef } from 'react';

const Hero = ({ data, isLoggedIn }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.fade-in');
        elements.forEach(el => el.classList.add('show'));
      }
    }, 200);
  }, []);

  return (
    <section id="hero" className="hero-section bg-primary text-white" ref={heroRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 text-center">
            <h1 className="display-3 fw-bold fade-in">{data.title}</h1>
            <p className="lead fade-in">{data.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
