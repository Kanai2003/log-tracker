import axios from "axios";
// import { IUser, ILog } from "../types";

axios.defaults.withCredentials = true;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Register a new user
export const registerUser = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${BASE_URL}/user/register`, { email, password, name });
  return response.data;
};

// Login a user
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post(`${BASE_URL}/user/logout`);
};

// Fetch user details and logs based on role
export const fetchUserData = async () => {
  const url = `${BASE_URL}/log/getlog`;
  const response = await axios.get(url);
  return response.data;
};


// Delete a log by ID
export const deleteLog = async (logId: string) => {
  await axios.put(`${BASE_URL}/log/deletelog/${logId}`);
};