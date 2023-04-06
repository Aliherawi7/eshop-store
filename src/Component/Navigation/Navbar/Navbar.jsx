import React, { useState } from 'react'
import "./Navbar.css"
import NavItems from '../NavItems/NavItems'
import Button from '../../UI/Button/Button'
import TogglerMenu from '../TogglerMenu/TogglerMenu'
import { useNavigate, Link } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import { actions, getBasketTotalItems } from "../../../reducer"
import Modal from '../../UI/modal/Modal'
import BasketPreview from '../BasketPreview/BasketPreview'
import ApiUrls from '../../../Constants/ApiUrls'

const Navbar = () => {
    const [stateTogglerMenu, setstateTogglerMenu] = useState({ show: false })
    const [state, dispatch] = useStateValue()
    const [input, setInput] = useState({ value: '' })
    const [showModal, setShowModal] = useState(false)
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
    const logout = () => {
        localStorage.clear();
        dispatch({
            type: actions.REMOVE_USER_INFORMATION
        })
        setShowModal(false)
    }
    return (
        <header className="header-nav">
            <div className='top-nav'>
                <Link to="/" className="nav-brand"><img src="/image/eshop-logo.png" /></Link>
                <form className="rearch-box" onSubmit={searchBtnHandler}>
                    <input name="search" value={input.value} onChange={(e) => (changeHandler(e))} placeholder="what do you need?" />
                    <Button btnType="success" click={searchBtnHandler}><i className="bi bi-search"></i></Button>
                </form>
                <div className="status-box">
                    <Modal show={showModal} ModalClose={() => setShowModal(false)}>
                        <h2>Are you sure?</h2>
                        <Button btnType="danger" click={logout}>Yes</Button>
                        <Button btnType="success" click={() => setShowModal(!showModal)}>No</Button>
                    </Modal>
                    {localStorage.getItem("email") != null ?
                        <div className='authentication'>
                            <div className='user-account'>
                                <img src={localStorage.getItem("image")} className='' />
                            </div>
                            <div className='account-settings'>
                                <Link to="/favorite"><i className='bi bi-heart'></i>Favorites</Link>
                                <Link to="" onClick={() => setShowModal(true)}><i className='bi bi-box-arrow-left'></i>Logout</Link>
                                <Link to="/account"><i className='bi bi-gear'></i>Settings</Link>
                            </div>
                        </div> :
                        <div className='acount-box'>
                            <i className='bi bi-box-arrow-in-left'></i>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    }
                    {
                        state.userInfo?.roles?.includes("ADMIN") ? <Link to="/admin-panel" className='settings'>
                            <i className='bi bi-gear-fill' style={{ "--i": "#2f3142" }}></i>
                        </Link> : ""
                    }
                    <Link to='/checkout' className='basket-icon'>
                        <i className="bi bi-cart3 basket"></i>
                        <span style={{ color: '#fff' }}>{getBasketTotalItems(state.basket)}</span>
                    </Link>
                    <BasketPreview />
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