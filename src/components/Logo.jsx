import React from 'react'
import logoImg from "../assets/logoImg.png"

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center space-x-2 text-3xl font-bold ">
      <img src={logoImg} alt="Postify Logo" style={{ width }} />
      <span>POSTIFY</span>
    </div>
  )
}

export default Logo