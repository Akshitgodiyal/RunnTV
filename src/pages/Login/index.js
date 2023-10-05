import React, { useState, useEffect } from "react";
import "../../assets/css/style.scss";
import LoginHeader from "../../component/Login-header";
import welcome from "../../assets/images/login-bg.png";
import realtv from "../../assets/images/real-tv.png";
import lock_outline from "../../assets/images/lock_outline.svg";
import mail_outline from "../../assets/images/mail_outline.svg";
import hide_text from "../../assets/images/hide-text.png";
import axios from "axios";
import { postData } from '../../api/apiMethod';
import { UUID_CODE, deviceType } from "../../utility/deviceid";
import CryptoJS from "crypto-js";
import { commonHeaders, encryptionKey as encryptionKeys } from "../../service/Constant";
import { Login_URL } from "../../service/API_URL";

export const logout = () => {
  localStorage.clear();
};
export default function Login() {
  //validations
  const [formData, setFormData] = useState({ username: "", password: "" });
  const encryptionKey = encryptionKeys;
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });

    // Real-time validation for email
    if (name === "username") {
      console.log("email",value , !isEmailValid(value));
      if (value && !isEmailValid(value)) {
     
        console.log("wrong");
          setErrors({
            ...errors,
            username: "Invalid email format",
          });
      
      } else {
        console.log("correct");
        setErrors({ ...errors, username: "", password: ""  }
        
        );
        

      }
    }

    // Real-time validation for password
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      setTimeout(() => {
        if (!passwordRegex.test(value)) {
          setErrors({
            ...errors,
            password:
              "Password must be at least 8 characters, contain at least one letter, and one symbol (@$!%*#?&)",
          });
        } else {
          setErrors({
            ...errors,
            password: "",
          });
        }
      }, 1000);
    }
  };
 
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("tok");
    if (storedEmail && storedPassword) {
      let decryptedBytes = CryptoJS.AES.decrypt(storedPassword, encryptionKey);
      let decrypted = decryptedBytes?.toString(CryptoJS.enc.Utf8);
      // console.log("decrypted", decrypted);
      setFormData({
        username: storedEmail,
        password: decrypted,
      });
    }
  }, []);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Your form submission logic here
  // };

  const isSubmitDisabled =
    errors.username ||
    errors.password ||
    !formData.username ||
    !formData.password;
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = () => {
    // Toggle the "Remember me" checkbox state
    setRememberMe(!rememberMe);
  };

  const LoginAPI = async () => {
  
    let URL = Login_URL
    const data = {
      email: formData.username,
      password: formData.password,
      deviceInfo: {
        deviceId: UUID_CODE(),
        deviceType: deviceType,
      },
    };

    try {
      const response = await postData(URL, data, {
        headers: commonHeaders
        
      });
      // console.log('POST response:', response);
      if (response.status === 200 && response.data.success === true) {
        localStorage.setItem("accessToken", response.data?.data?.accessToken);
        localStorage.setItem("refreshToken", response.data?.data?.refreshToken);
       
        localStorage.setItem("userdetail",  JSON.stringify(response.data?.data?.user));

        if (rememberMe) {
          sessionStorage.setItem("email", formData.username);
          const encrypted = CryptoJS.AES.encrypt(
            formData.password,
            encryptionKey
          ).toString();
          // setEncryptedPassword(encrypted);
          sessionStorage.setItem("tok", encrypted);
        } else {
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("tok");
        }



setTimeout(() => {
  window.location.href = "/viewership"
}, 1500);
       
      
   
      } else {
       
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("tok");
        setErrors({
          ...errors,
          password: "Password is incorrect. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error posting data:', error);
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("tok");
      // Handle the error as needed, e.g., show an error message to the user.
      setErrors({
        ...errors,
        password: "Something went wrong, Please try after sometime",
      });
  
    }

  };
  return (
    <>
      <LoginHeader />
      <div className="main">
        <div className="welcome">
          <div className="img">
            <img src={welcome} alt="asfg" />
          </div>
          <div className="welcome-content">
            <img src={realtv} alt="" />
            <h1>Welcome Back!</h1>
            <p>
              Enter your registered email address and password and continue with
              us!
            </p>
          </div>
        </div>
        <div className="login-block">
          <div className="login-form">
            <div className="title">
              <h2>Login</h2>
            </div>
            {/* <form> */}
            <div
              className={
                errors.username ? "form-group error-msg" : "form-group"
              }
            >
              <label className="form-label">Email address</label>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <img src={mail_outline} alt="" />
                </div>
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Enter email address"
                  className="form-control"
                  defaultValue={formData.username}
                  onChange={handleChange}
                  autoComplete={!rememberMe ? "on" : "off"}
                />
              </div>
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <img src={lock_outline} alt="" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="form-control"
                  defaultValue={formData.password}
                  onChange={handleChange}
                  autoComplete={!rememberMe ? "on" : "off"}
                />
                <a
                  type="button"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    style={{ margin: "auto 0px auto 5px" }}
                    src={hide_text}
                    alt=""
                  />
                </a>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={handleRememberMeChange}
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col-sm-6 text-right">
                <a className="forgot" href="/forget-password">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              onClick={() => LoginAPI()}
              disabled={isSubmitDisabled}
              className="btn btn-block"
            >
              Login
            </button>
            {/* <button  onClick={() => hello()} className="btn btn-block">hello n</button> */}
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
