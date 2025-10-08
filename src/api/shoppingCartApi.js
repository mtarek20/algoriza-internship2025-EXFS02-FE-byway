import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/cart";

export const getCart = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};

export const addToCart = async (userId, courseId) => {
  await axios.post(`${API_URL}/${userId}/add/${courseId}`);
};

export const removeFromCart = async (userId, courseId) => {
  await axios.delete(`${API_URL}/${userId}/remove/${courseId}`);
};
