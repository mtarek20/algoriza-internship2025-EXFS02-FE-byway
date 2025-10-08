import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/courses";

export const getCourses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getTopCourses = async () => {
  const res = await axios.get(`${API_URL}/top`);
  return res.data;
};

export const getPagedCourses = async () => {
  const res = await axios.get(`${API_URL}/paged`);
  return res.data;
};

export const getCoursesCurrentPage = async (page, limit) => {
  const res = await axios.get(`${API_URL}/paged?page=${page}&limit=${limit}`);
  return res.data;
};
export const getCourse = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createCourse = async (courseData) => {
  const res = await axios.post(API_URL, courseData);
  return res.data;
};

export const updateCourse = async (id, course) => {
  const res = await axios.put(`${API_URL}/${id}`, course);
  return res.data;
};

export const getSearchCourses = async (searchParams) => {
  const res = await axios.get(`${API_URL}/search`, {
    params: searchParams,
    paramsSerializer: { indexes: null },
  });
  return res.data;
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.status;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data); // الرسالة من الباك
    }
    throw new Error("Something went wrong");
  }
};
