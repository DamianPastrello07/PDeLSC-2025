import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-indigo-600">Mi Portfolio</h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-indigo-600">Sobre mí</a></li>
          <li><a href="#skills" className="hover:text-indigo-600">Habilidades</a></li>
          <li><a href="#projects" className="hover:text-indigo-600">Proyectos</a></li>
          <li><a href="#contact" className="hover:text-indigo-600">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
}
