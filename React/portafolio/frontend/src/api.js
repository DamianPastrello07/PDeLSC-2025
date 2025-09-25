import axios from "axios";

// URL base del backend
const API_URL = "https://p-de-lsc-2025-8do4.vercel.app"; // Cambia según tu host

// ABOUT 
export const getAbout = async () => {
  const res = await axios.get(`${API_URL}/about`);
  return res.data;
};

export const updateAbout = async (aboutData, token) => {
  const res = await axios.put(`${API_URL}/about`, aboutData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// SKILLS
export const getSkills = async () => {
  const res = await axios.get(`${API_URL}/skills`);
  return res.data;
};

export const addSkill = async (skillData, token) => {
  const res = await axios.post(`${API_URL}/skills`, skillData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteSkill = async (id, token) => {
  const res = await axios.delete(`${API_URL}/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// PROJECTS
export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/projects`);
  return res.data;
};

export const addProject = async (projectData, token) => {
  const res = await axios.post(`${API_URL}/projects`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProject = async (id, projectData, token) => {
  const res = await axios.put(`${API_URL}/projects/${id}`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProject = async (id, token) => {
  const res = await axios.delete(`${API_URL}/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
