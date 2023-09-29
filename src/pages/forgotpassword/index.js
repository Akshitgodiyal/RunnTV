import React, { useState } from 'react';
import "../../assets/css/style.scss"
import LoginHeader from '../../component/Login-header'
import realtv from "../../assets/images/real-tv.png"
import welcome from "../../assets/images/login-bg.png"
import lock_outline from "../../assets/images/lock_outline.svg"
import {postData} from"../../api/apiMethod"
import { commonHeaders } from '../../service/Constant';
export default function ForgetPassword() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'username' && formData.username && !isEmailValid(value)) {
      setErrors({
        ...errors,
        username: 'Invalid email format',
      });
    } else {
      setErrors({
        ...errors,
        username: '',
      });
    }
    console.log("sadsda", isEmailValid(value));
  };
  const forgetPasswordAPI = async () => {

    let URL = `${process.env.REACT_APP_REFRESHTOKEN_URL}auth/password/resetlink`;
    const data = {
      email: formData.username,
    };


    try {
      console.log("URL", URL);
      const response = await postData(URL, data, {
        headers: commonHeaders
        ,
      });
   
     
alert("Password reset link sent successfully")
      console.log("response", response);
    } catch (error) {
      alert("Something Went Wrong");
      console.error("An error occurred:", error);
      // You can handle the error here, for example, show an error message to the user.
    }
  };



  return (
    <>
      <LoginHeader />
      <div className="main">
        <div className="welcome">
          <div className="img">
            <img src={welcome} alt="" />
          </div>
          <div className="welcome-content forget-content">
            <img src={realtv} alt="" />
            <p>With Runn TV, we are bringing the <span>Simplicity, Fun</span> and <span>Comfort</span> of traditional TV viewing on Digital.</p>
          </div>
        </div>
        <div className="login-block">
          <div className="login-form">
            <div className="title">
              <h2>Forgot password?</h2>
              <p>Enter your email to reset your password</p>
            </div>

            <div className="form-group">
              <label className="form-label">Email address</label>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <img src={lock_outline} alt="" />
                </div>
                {/* <input type="text" placeholder="Enter email address" className="form-control"/> */}


                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Enter email address"
                  className="form-control"
                  defaultValue={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur} // Add onBlur event handler
                />

              </div>
              {errors.username && <span className="error">{errors.username}</span>}

            </div>
            {/* <button type="submit" className="btn btn-block">Submit</button>  */}
            <button onClick={() => forgetPasswordAPI()} className="btn btn-block">Submit</button>

            <div className="retun-block">
              <p>Return to <a href='/'>Login !</a></p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
