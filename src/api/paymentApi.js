import axios from "axios";

const API_URL = "https://mtarekbyway-001-site1.stempurl.com/api/payments";

export const getPayments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPayment = async (payment) => {
  const res = await axios.post(API_URL, payment);
  return res.data;
};
