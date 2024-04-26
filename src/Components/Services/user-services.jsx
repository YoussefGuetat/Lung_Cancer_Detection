import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const userServices = {
  addUser: async (user) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, user);
      return response.data; 
    } catch (error) {
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userServices;
