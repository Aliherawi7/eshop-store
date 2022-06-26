import React, {useState} from 'react'
import NavItem from '../NavItem/NavItem'
import "./NavItems.css"

const NavItems =() => {
    return(
        <nav>
            <ul className="nav-items">
                <NavItem link="/" >Home</NavItem>
                <NavItem link="/store" >Store</NavItem>
                <NavItem link="/best-sellers" >Best Sellers</NavItem>
                <NavItem link="/customer-service" >Customer Service</NavItem>
                <NavItem link="/about" >About</NavItem>
            </ul>
        </nav>
    )
}

export default NavItems