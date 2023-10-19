import axios from "axios";

import { Logout_URL, Partnercreate_URL, Partnerdelete_URL, Partnerlist_URL, Partnersearch_URL, Partnerupdate_URL, RefreshToken_URL, ViewershipMap_URL, ViewershipTableChild_URL, ViewershipTablehead_URL } from "../service/API_URL";
import { deleteInstantData, getInstantData, postData, postInstantData } from "./apiMethod";
import { UUID_CODE, deviceType } from "../utility/deviceid";
const refreshToken = localStorage.getItem("refreshToken")

export const refreshTokenAPI = async () => {
    let URL = RefreshToken_URL;
    const data = {
        "refreshToken": refreshToken
    }
    try {
        const { data: { success, data: { accessToken }
        } } = await axios.post(URL, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        });


        if (success) {
            localStorage.setItem("accessToken", accessToken)
            // await profileApi();
        }
    } catch (err) {
        const { response: { data: { message } } } = err;
        if (message == "Refresh token expired") {
            window.location.href = "/"
        }
    }

};


export const ViewershipTablehead = async (data,setshowLoader) => {
    let URL = ViewershipTablehead_URL
    setshowLoader(true)
    try {
      const response = await postInstantData(URL, data)
    //   console.log('POST response:', response);
    setshowLoader(false)
      return response;
    } catch (error) {
      setshowLoader(false)
    // alert("Something wents wrong, Please try again.");
    }

  };

  export const ViewershipTableChild = async (data,setshowLoader) => {
    let URL = ViewershipTableChild_URL
    setshowLoader(true)
    try {
      const response = await postInstantData(URL, data)
      setshowLoader(false)
      return response;
    } catch (error) {
      setshowLoader(false)
    // alert("Something wents wrong, Please try again.");
    }

  };

  export const ViewershipMap = async (data) => {
    let URL = ViewershipMap_URL
   
    try {
      const response = await postInstantData(URL, data)
    //   console.log('POST response:', response);
      return response;
    } catch (error) {
      
    // alert("Something wents wrong, Please try again.");
    }

  };


  export const Logout_Api = async () => {
    let URL = Logout_URL
    const data = {
      
      deviceInfo: {
        deviceId: UUID_CODE(),
        deviceType: deviceType,
      },
    };

    try {
      const response = await postData(URL, data)
      setTimeout(() => {
       
      }, 1500);
      // return response;
    } catch (error) {
      window.location.href = "/"
    // alert("Something wents wrong, Please try again.");
    }

  };

  //asset Management
  export const Partner_list = async () => {
    let URL = Partnerlist_URL
    const data = {
      
      deviceInfo: {
        deviceId: UUID_CODE(),
        deviceType: deviceType,
      },
    };

    try {
      const response = await getInstantData(URL, data)
  
      return response;
    } catch (error) {
      // window.location.href = "/"
    // alert("Something wents wrong, Please try again.");
    }

  };
  export const Partner_search = async (search) => {
    let URL = Partnersearch_URL
    const data = {
      
      deviceInfo: {
        deviceId: UUID_CODE(),
        deviceType: deviceType,
      },
    };
    const params = {
  name:search
    };

    try {
      const response = await getInstantData(URL ,{params})
  
      return response;
    } catch (error) {
      // window.location.href = "/"
    // alert("Something wents wrong, Please try again.");
    }

  };

  export const Partner_delete = async (param) => {
    let URL = Partnerdelete_URL+"/"+param
    
    try {
      const response = await deleteInstantData(URL)
 return response
   
    } catch (error) {
      return error
    // alert("Something wents wrong, Please try again.");
    }

  };

  export const Partner_update = async (data,param) => {
    let URL = Partnerupdate_URL+"/"+param

  
    try {
      const response = await postInstantData(URL, data)
    //   console.log('POST response:', response);
      return response;
    } catch (error) {
      
    // alert("Something wents wrong, Please try again.");
    }

  };

  export const Partner_create = async (data) => {
    let URL = Partnercreate_URL
  
    try {
      const response = await postInstantData(URL, data)
      console.log('POST response:', response);
      return response;
    } catch (error) {
      
    alert("Something wents wrong, Please try again.");
    }

  };

  export const Partner_archive = async (param) => {
    let URL = Partnerdelete_URL+"/"+param+"/archive"
    
    try {
      const response = await postInstantData(URL)
 return response
   
    } catch (error) {
      return error
    // alert("Something wents wrong, Please try again.");
    }

  };