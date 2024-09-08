import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
function Navbar() {
  return (
    <div className='navbar'>
        <img src={assets.logo}  alt="" className="logo" />
        <img src={assets.logo}  alt="" className="profile" />

    </div>
  )
}

export default Navbar