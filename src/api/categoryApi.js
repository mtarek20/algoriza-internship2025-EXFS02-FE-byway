import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/categories";

export const getCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getCategory = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
