import React, { useState } from 'react'
import "./Navbar.css"
import NavbarBrand from "../NavbarBrand/NavbarBrand"
import NavItems from '../NavItems/NavItems'
import Button from '../../UI/Button/Button'
import TogglerMenu from '../TogglerMenu/TogglerMenu'
import { useNavigate, Link } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import { actions, getBasketTotalItems } from "../../../reducer"

const Navbar = () => {
    const [stateTogglerMenu, setstateTogglerMenu] = useState({ show: false })
    const [state, dispatch] = useStateValue()
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
    const signout = () => {
        localStorage.clear();
        dispatch({
            type: actions.REMOVE_USER_INFORMATION
        })
    }
    return (
        <header className="header-nav">
            <div className='top-nav'>
                <NavbarBrand />
                <form className="rearch-box" onSubmit={searchBtnHandler}>
                    <input name="search" value={input.value} onChange={(e) => (changeHandler(e))} placeholder="what do you need?" />
                    <Button btnType="success" click={searchBtnHandler}><i className="bi bi-search"></i></Button>
                </form>
                <div className="status-box">
                    <div className='acount-box'>
                        <p>
                            Hello {state.userInfo.name ? state.userInfo.name + " " + state.userInfo?.lastName : "guest"}
                        </p>
                        {
                            state.userInfo?.name ? <Link to="/" onClick={signout}><strong>Sign out</strong></Link> :
                                <Link to="/login"><strong>Sign in</strong></Link>
                        }

                    </div>
                    {
                        state.userInfo?.roles?.includes("ADMIN") ? <Link to="/admin-panel" className='settings'>
                            <i className='bi bi-gear-fill' style={{ "--i": "#2f3142" }}></i>
                        </Link> : ""
                    }
                    <Button click={() => (navigate('/checkout'))}><i className="bi bi-cart3 basket"></i> <span style={{ color: '#fff' }}>: {getBasketTotalItems(state.basket)}</span></Button>
                </div>
            </div>
            <div className="bottom-nav">
                <form className="rearch-box" onSubmit={searchBtnHandler}>
                    <input name="search" value={input.value} onChange={(e) => (changeHandler(e))} placeholder="what do you need?" />
                    <Button btnType="success" click={searchBtnHandler}><i className="bi bi-search"></i></Button>
                </form>
                <TogglerMenu show={stateTogglerMenu.show} />
                <div className="btnToggler">
                    <Button id="TogglerBtn" click={togglerMenu}><i className="bi bi-list"></i></Button>
                </div>
                <div className='bottom-nav-items'>
                    <NavItems />
                </div>
            </div>
        </header>
    )
}

export default Navbar