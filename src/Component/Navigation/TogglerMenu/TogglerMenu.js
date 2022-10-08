import React from 'react'
import "./TogglerMenu.css"
import NavItems from '../NavItems/NavItems'

const TogglerMenu = (props) => {
    return (
        <>
        <div className="toggler-menu" style={{height: props.show ? "160px":"0"}}>
            <div className="nav-items-container">
                <NavItems />
            </div>
        </div>
        </>
    )
}

export default TogglerMenu