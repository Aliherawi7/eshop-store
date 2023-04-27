import React from 'react'
import "./Layout.css"
import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = (props) => {
    return (
        <div id='main_container'>
            <Navbar />
            <main className="main-container">{props.children}

            </main>

            <Footer />
        </div>
    )
}

export default Layout