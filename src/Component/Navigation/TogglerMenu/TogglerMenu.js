import React from 'react'
import "./TogglerMenu.css"
import NavItems from '../NavItems/NavItems'
import Button from "../../UI/Button/Button"
import { useNavigate } from 'react-router-dom'
import {useStateValue} from '../../../StateProvider'

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