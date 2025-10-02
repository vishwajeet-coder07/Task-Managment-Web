import axios from 'axios';
import { apiBaseUrl } from '../constant';

export const registerUser = async (userData) => {
   try {
      const response = await axios.post(`${apiBaseUrl}/user/register`, {
         fullName: userData.fullName,
         email: userData.email,
         password: userData.password
      });
      
      console.log("Registration response:", response);
      
      return {
         success: true,
         data: response.data
      };
   } catch (error) {
      console.error("Registration error:", error);
      return {
         success: false,
         error: error.response?.data?.message || error.message || 'Registration failed'
      };
   }
}

export const getinfo = async () => {
   try {
      const response = await axios.get(`${apiBaseUrl}/user/getUser`);
      return response.data;
   } catch (error) {
      console.error("Get user info error:", error);
      throw error;
   }
}