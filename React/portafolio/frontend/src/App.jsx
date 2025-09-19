import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { getAbout, getSkills, getProjects, deleteSkill, deleteProject } from "./api";

function App() {
  const [heroData] = useState({ title: "Juan Pérez", subtitle: "Desarrollador Full Stack", description: "Creando experiencias digitales..." });
  const [aboutData, setAboutData] = useState({});
  const [skillsData, setSkillsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [contactData] = useState({ email: "contacto@example.com", phone: "+123 456 7890" });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setAboutData(await getAbout());
      setSkillsData(await getSkills());
      setProjectsData(await getProjects());
    };
    fetchData();
  }, []);

  const handleDeleteSkill = async (id) => {
    if (!isAdmin) return;
    await deleteSkill(id);
    setSkillsData(skillsData.filter(s => s._id !== id));
  };

  const handleDeleteProject = async (id) => {
    if (!isAdmin) return;
    await deleteProject(id);
    setProjectsData(projectsData.filter(p => p._id !== id));
  };

  return (
    <div>
      <Hero hero={heroData} />
      <About about={aboutData} isAdmin={isAdmin} onEdit={() => alert("Editar About")} />
      <Skills skills={skillsData} isAdmin={isAdmin} onDelete={handleDeleteSkill} />
      <Projects projects={projectsData} isAdmin={isAdmin} onDelete={handleDeleteProject} onEdit={(p) => alert("Editar proyecto: " + p.title)} />
      <Footer contact={contactData} />
    </div>
  );
}

export default App;
