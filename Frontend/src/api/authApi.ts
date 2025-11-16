

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

// REGISTER
export const registerUserAPI = async (data: {
  name: string;
  email: string;
  password: string;
  age?: number;
}) => {
  const res = await API.post("/register", data);
  return res.data;
};

// LOGIN
export const loginUserAPI = async (data: { email: string; password: string }) => {
  const res = await API.post("/login", data);
  return res.data;
};

// FORGOT PASSWORD  ✅ ADD THIS
export const forgotPasswordAPI = async (data: { email: string }) => {
  const res = await API.post("/forgot-password", data);
  return res.data;
};

// RESET PASSWORD  ✅ ADD THIS
export const resetPasswordAPI = async (token: string, newPassword: string) => {
  const res = await API.post(`/resetPassword/${token}`, { newPassword });
  return res.data;
};
