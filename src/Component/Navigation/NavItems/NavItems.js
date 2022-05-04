import React, {useState} from 'react'
import NavItem from '../NavItem/NavItem'
import "./NavItems.css"

const NavItems =() => {
    return(
        <nav>
            <ul className="nav-items">
                <NavItem link="/" >Home</NavItem>
                <NavItem link="/store" >Store</NavItem>
                <NavItem link="/vip" >VIP</NavItem>
                <NavItem link="/contact" >Contact</NavItem>
                <NavItem link="/about" >About</NavItem>
            </ul>
        </nav>
    )
}

export default NavItems