import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return(
        <footer>
            <img src="/image/eshop-logo.png" />
            <div className="footer-link">
                <div className="copyright">all right reserved<Link to="/">eShop</Link></div>
                <div className="policy">
                        <Link to="/">Terms & Conditions</Link>
                        <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer