import React from 'react'
import "./Layout.css"
import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = (props) =>{
    return(
        <div>
            <Navbar/>
            <div class="pop-up-menu">
                <i class="bi bi-facebook "></i>
                <i class="bi bi-twitter "></i>
                <i class="bi bi-pinterest "></i>
                <i class="bi bi-basket-fill "></i>

            </div>
            <main className="main-container">{props.children}</main>
            
            <Footer />
        </div>
    )
}

export default Layout