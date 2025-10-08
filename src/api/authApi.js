import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/auth";

export const signup = async (data) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
