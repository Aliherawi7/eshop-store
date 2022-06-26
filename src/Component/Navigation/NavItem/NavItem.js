import React from 'react'
import {Link} from "react-router-dom"
import "./NavItem.css"

const NavItem = (props) =>{
    const isActive = props.link === (window.location.pathname)
    const active = isActive ? "nav-item active":"nav-item";
    const underline = {
        
    }
    return (
        <li className={active} >
            <Link to={props.link} onClick={props.click}>
                {props.children}
            </Link>
        </li>
    )
}

export default NavItem