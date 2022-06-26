import React from 'react'
import {Link} from 'react-router-dom'
import "./NavbarBrand.css"

const NavbarBrand = (props) =>{
    return (
        <Link to="/" className="nav-brand"><img src="/image/eshop-logo.png"/></Link>
    )
}

export default NavbarBrand