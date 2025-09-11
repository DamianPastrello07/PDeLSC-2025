import axios from "axios";

const API_URL = "http://localhost:5173/portfolio"; // Cambiar según tu backend

export const getPortfolio = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updatePortfolio = async (token, data) => {
  const res = await axios.post(`${API_URL}/update`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
