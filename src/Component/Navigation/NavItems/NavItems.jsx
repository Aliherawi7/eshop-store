import React from 'react'
import NavItem from '../NavItem/NavItem'
import "./NavItems.css"

const NavItems =() => {
    return(
        <nav>
            <ul className="nav-items">
                <NavItem link="/" >Home</NavItem>
                <NavItem link="/store" >store</NavItem>
                <NavItem link="/best-sellers" >Best Sellers</NavItem>
                <NavItem link="/customer-service" >Blog</NavItem>
                <NavItem link="/about" >About</NavItem>
            </ul>
        </nav>
    )
}

export default NavItems