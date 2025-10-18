import axios from "axios";
const API_BASE_URL = "https://localhost:5000/register";
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};