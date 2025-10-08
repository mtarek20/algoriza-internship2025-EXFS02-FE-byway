import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/instructors";

export const getInstructors = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getSearchInstructors = async (search, page, pageSize = 7) => {
  const res = await axios.get(`${API_URL}/search`, {
    params: { search, page, pageSize },
  });
  return res.data;
};

export const getInstructor = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addInstructor = async (instructor) => {
  const res = await axios.post(API_URL, instructor);
  console.log(res.data);
  return res.data;
};

export const updateInstructor = async (id, instructor) => {
  const res = await axios.put(`${API_URL}/${id}`, instructor);
  return res.data;
};

export const deleteInstructor = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.imageUrl;
};
