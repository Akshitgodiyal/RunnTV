import React, { useState,useEffect } from 'react';

import person from "../../assets/images/person.svg";
import help_outline from "../../assets/images/help_outline.svg";
import call from "../../assets/images/call.svg";
import info from "../../assets/images/info.svg";
import power_settings_new from "../../assets/images/power_settings_new.svg";
import logo from "../../assets/images/logo.png";
import "./DashboardHeader.scss";
export default function DashboardHeader() {
  const [userActive, setUserActive] = useState(false);

  const userDropdown = () => {
    setUserActive(!userActive);
  };

  const userDropdownClose = () => {
    setUserActive(false);
  };
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update the date every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerID);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formattedDate = formatDate(currentDate);
  return (
    <div className="dashboard-header">
      <div className="left-side">
        <div className="logo">
          <a href="#">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="welcome-name">
          <h5>Welcome back, Manish Sinha</h5>
          <div className="date">
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="user">
          <div className="user-dropdown">
            <a
              className={`box ${userActive ? 'active' : 'no-active'}`}
              onClick={userDropdown}
            >
              <div className="name">M</div>
            </a>
            <div className={`dropdown ${userActive ? 'show' : 'no-show'}`}>
              <a className="close" onClick={userDropdownClose}>
                Account
              </a>
              <ul>
                <li>
                  <a href="">
                    <img src={person} alt="My Profile" />My Profile
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={help_outline} alt="Need Help" />Need Help?
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={call} alt="Contact Us" />Contact Us
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={info} alt="More Info" />More Info
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={power_settings_new} alt="Logout" />Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
