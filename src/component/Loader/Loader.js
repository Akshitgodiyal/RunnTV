import React from 'react'
import "./loader.scss"
import loading from "../../assets/images/loading.gif"
function Loader() {
  return (
    <div className='loader-container'>
        <img className="loader" src={loading} />
        </div>
  )
}

export default Loader