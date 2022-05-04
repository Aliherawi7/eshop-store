import React from 'react'
import "./TogglerMenu.css"
import NavItems from '../NavItems/NavItems'
import AccountAvatar from '../user-account/AccountAvatar'
import Button from "../../UI/Button/Button"
import { useNavigate } from 'react-router-dom'
import {useStateValue} from '../../../StateProvider'

const TogglerMenu = (props) => {
    const navigate = useNavigate()
    const [{basket}, dispatch] = useStateValue()
    return (
        <>
        <div className="account-toggler" >
        <Button click={()=>(navigate('/checkout'))}><i className="bi bi-cart3 basket"></i> <span style={{color:'#fff'}}>: {basket.length}</span></Button>
                <AccountAvatar account="/account">
                    <i className="bi bi-person-circle"></i>
                </AccountAvatar>
            </div>
        <div className="toggler-menu" style={{height: props.show ? "210px":"0"}}>
            
            <div className="nav-items-container">
                <NavItems />
            </div>
        </div>
        </>
    )
}

export default TogglerMenu