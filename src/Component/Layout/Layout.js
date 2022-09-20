import React from 'react'
import "./Layout.css"
import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = (props) =>{
    return(
        <div>
            <Navbar/>
            <div className="pop-up-menu">
                <i className="bi bi-facebook "></i>
                <i className="bi bi-twitter "></i>
                <i className="bi bi-pinterest "></i>
                <i className="bi bi-basket-fill "></i>

            </div>
            <main className="main-container">{props.children}</main>
            
            <Footer />
        </div>
    )
}

export default Layout