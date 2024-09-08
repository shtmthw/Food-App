import React from 'react'
import './footer.css'
import { assets } from '../../../assets/assets'
function Fotter() {
  return (
    <div className="footer">
        <div className="fotter-cnt">
            <div className="footer-cnt-left">
                <img width={150} src={assets.logo} alt="" />
                <p>Find Us Here!!</p>
                <div className="fotter-socials">
                    <img width={30} src={assets.facebook} alt="" />
                    <img width={30} src={assets.instagram} alt="" />
                    <img width={35} src={assets.onlyfans} alt="" />
                
                </div>
            </div>
            <div className="footer-cnt-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delvery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-cnt-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>69-69-69-420</li>
                    <li>cumuniverse@cumthrow.cum</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="f-cright"> Not Attained, might be illegal</p>
    </div>
)
}

export default Fotter