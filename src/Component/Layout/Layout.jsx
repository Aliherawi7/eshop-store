import React from 'react'
import "./Layout.css"
import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = (props) =>{
    return(
        <div>
            <Navbar/>
            <main className="main-container">{props.children}
            
            </main>
            
            <Footer />
        </div>
    )
}

export default Layout