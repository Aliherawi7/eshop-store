import React from 'react'
import "./AccountAvatar.css"
import {Link} from 'react-router-dom'



const AccountAvatar = (props) =>{
    return(
        <div className="user-account">
            <Link to={props.account}>
                {props.children}
            </Link>
        </div>
    )
}

export default AccountAvatar