import React, { useState } from 'react'
import "./Navbar.css"
import NavbarBrand from "../NavbarBrand/NavbarBrand"
import NavItems from '../NavItems/NavItems'
import AccountAvatar from '../user-account/AccountAvatar'
import Button from '../../UI/Button/Button'
import TogglerMenu from '../TogglerMenu/TogglerMenu'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'

const Navbar = (props) => {
    const [stateTogglerMenu, setstateTogglerMenu] = useState({ show: false })
    const [{ basket }, dispatch] = useStateValue()
    const [input, setInput] = useState({ value: '' })
    const navigate = useNavigate()
    const togglerMenu = () => {
        setstateTogglerMenu({ show: stateTogglerMenu.show ? false : true })
    }
    const searchBtnHandler = () => {
        if (input.value)
            navigate('/search/' + input.value)
    }
    const changeHandler = (e) => {
        setInput({ value: e.target.value })
    }
    return (
        <header className="header-nav">
            <div className='top-nav'>
                <NavbarBrand />
                <form className="rearch-box" onSubmit={searchBtnHandler}>
                    <input name="search" value={input.value} onChange={(e) => (changeHandler(e))} placeholder="what do you need?" />
                    <Button btnType="success" click={searchBtnHandler}><i className="bi bi-search"></i></Button>
                </form>

                <div className="account-container">
                    <Button click={() => (navigate('/checkout'))}><i className="bi bi-cart3 basket"></i> <span style={{ color: '#fff' }}>: {basket.length}</span></Button>
                    <AccountAvatar account="/account">
                        <i className="bi bi-person-circle"></i>
                    </AccountAvatar>
                </div>
            </div>
            <div className="bottom-nav">
                <TogglerMenu show={stateTogglerMenu.show} />
                <div className="btnToggler">
                    <Button id="TogglerBtn" click={togglerMenu}><i className="bi bi-list"></i></Button>
                </div>
                <NavItems />
            </div>
        </header>
    )
}

export default Navbar