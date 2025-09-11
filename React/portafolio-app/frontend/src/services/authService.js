import axios from "axios";

const API_URL = "http://localhost:5173"; // Cambiar según tu backend

export const registerUser = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data; // Devuelve { token, username }
};
