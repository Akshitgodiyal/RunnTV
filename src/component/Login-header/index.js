import React from 'react'
import logo from "../../assets/images/logo.png"

import "./LoginHeader.scss"
export default function LoginHeader() {
  return (
    <div className="header-section">
    <div className="logo">
        <a href=""><img src={logo} alt="" /></a>
    </div>
    <div className="right-side">
        <div  className="need-help">
            <a href="">Need help?</a>
        </div>
        <div className="contact-us">
            <a href="#" className="btn">Contact us</a>
        </div>
    </div>
</div>
  )
}
