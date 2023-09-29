import React, { useState } from 'react';
import "../../assets/css/style.scss"
import LoginHeader from '../../component/Login-header'
import realtv from "../../assets/images/real-tv.png"
import welcome from "../../assets/images/login-bg.png"
import lock_outline from "../../assets/images/lock_outline.svg"
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };
// Password Validation
  const validatePassword = (newPassword, newConfirmPassword) => {
    if (newPassword.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
      setPasswordError('Password must contain a minimum of 8 characters and at least one symbol e.g. @, !');
    } 
    // else if (!/[a-zA-Z]/.test(newPassword)) {
    //   setPasswordError('Password must contain at least one letter');
    // }
    // else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
    //   setPasswordError('Password must contain a minimum of 8 characters and at least one symbol e.g. @, !');
    // } 
    else if (newPassword !== newConfirmPassword) {
      setPasswordError('The passwords did not match. Please try again');
    } else {
      setPasswordError('');
    }
  
    // Check if passwords match when both fields change
    setPasswordsMatch(newPassword === newConfirmPassword);
  };

  const ResetPasswordAPI = async () => {
    // Parse the reset link
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
  
    if (!token || !email) {
      // Handle the case when token or email is missing in the link
    //   console.error("Token or email is missing in the reset link",!token || !email);
      return;
    }
  
    let URL = `${process.env.REACT_APP_REFRESHTOKEN_URL}auth/password/reset`;
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    };
  
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": true,
        },
      });
  
      // console.log("Response data:", response.data.data, response.data.success);
  alert("success",response.data.success)
      // Handle success response here
    } catch (error) {
      // Handle error response here
      // console.log("Error:", error);
      alert("LINK EXPIRED TRY AGAIN")
    }
  };
  
  const isSubmitDisabled =  !passwordError == '' || !password || !confirmPassword
  
  



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
              <h2>Reset password</h2>
            </div>
           
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-group input-group-sm">
                  <div className="input-group-prepend">
                    <img src={lock_outline} alt="" />
                  </div>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className={passwordError == "The passwords did not match. Please try again" ? "form-group error-msg" : "form-group"}>
                <label className="form-label">Confirm new password</label>
                <div className="input-group input-group-sm">
                  <div className="input-group-prepend">
                    <img src={lock_outline} alt="" />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                {passwordError && (
                  <span className="error">{passwordError}</span>
                )}
                {!passwordsMatch && !passwordError && (
                  <span className="error">The passwords do not match. Please try again</span>
                )}
              </div>
           
              <button disabled={isSubmitDisabled} onClick={()=>ResetPasswordAPI()} className="btn btn-block">Reset password</button>
 
            <div className="retun-block">
              <p>Return to <a href='/'>Login !</a></p>
              {/* <p>Return to <a [routerLink]="['/']">Login !</a></p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
