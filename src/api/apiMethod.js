import instance from "../service/axiosConfig";
import axios from "axios";
//API method

// Function for making a GET request
// export const fetchData = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/data`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Function for making a POST request
export const postData = async (URL,data,headers) => {
    try {
      const response = await axios.post(`${URL}`, data, headers);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const postInstantData = async (URL,data,headers) => {
      try {
        const response = await instance.post(`${URL}`, data, headers);
        return response;
      } catch (error) {
        throw error;
      }
    };
  
  