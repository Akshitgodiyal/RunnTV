import instance from "../service/axiosConfig";
import axios from "axios";
//API method

//get method
export const getData = async (URL,headers) => {


  try {
    const response = await  axios.get(`${URL}`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInstantData = async (URL,headers) => {
  try {
    const response = await instance.get(`${URL}`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
  
    export const deleteInstantData = async (URL,headers) => {
      try {
        const response = await instance.delete(`${URL}`, headers);
        console.log("dsfghjk");
        return response;
      } catch (error) {
    return error.response.data
        // throw error;
      }
    };