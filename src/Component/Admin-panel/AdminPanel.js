import React, { useEffect, useRef, useState } from 'react'
import "./AdminPanel.css"
import { useStateValue } from "../../StateProvider"
import { Link } from 'react-router-dom';
import NotFound from "../Pages/NotFoundPage/NotFound"
import admintTools from './AdminTools';
import SmallLoading from '../UI/Loading/SmallLoading';
import { actions } from '../../reducer'
import { BytesToFile } from '../Utils/BytesToFile';

let counter = 0
function AdminPanel() {
  const [state, dispatch] = useStateValue();
  const [currentComponent, setCurrentComponent] = useState({ component: admintTools[counter] });
  const infoPanel = useRef();
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    dispatch({
      type: actions.LOADING
    })
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500)
  }, [])

  const currentComponentHandler = (id) => {
    counter = id
    setCurrentComponent({ component: admintTools[counter] })
  }
  const handleFullScreen = ()=>{
    
    const element = infoPanel.current;
    console.log(element.style.left)
    if(element.style.left == "0px"){
      element.style.left= "245px"
      
    }else{
      element.style.left = 0
    }
    
  }
  
  return (
    state.userInfo.roles.includes("ADMIN") ?
      <div className='admin-panel fade-in'>
        <div className='admin-menu' >

          <div className='account-info'>
            <img src={BytesToFile(localStorage.getItem("image"))? BytesToFile(localStorage.getItem("image")):""} className='bi bi-person-circle' />
            <div>
              <h3>{state.userInfo?.name + " " + state.userInfo?.lastName}</h3>
              <p>{state.userInfo?.email}</p>
            </div>
            <Link to="/"><i className='bi bi-gear-fill' style={{ "--i": "#2f3142" }}></i></Link>
          </div>
          <span className='text-menu'>menu</span>
          <ul className='menu-list'>
            <li style={{ "--i": "#6969d9" }} className={counter == 0 ? "active-menu " : ""} onClick={() => currentComponentHandler(0)}>
              <i className='bi bi-house-door-fill' ></i>
              Dashboard
            </li>
            <li style={{ "--i": "#32a7e1" }} className={counter == 1 ? "active-menu " : ""} onClick={() => currentComponentHandler(1)}>
              <i className='bi bi-box' ></i>
              Products
            </li>
            <li style={{ "--i": "#b44ac6" }} className={counter == 2 ? "active-menu " : ""} onClick={() => currentComponentHandler(2)}>
              <i className='bi bi-boxes' ></i>
              Categories
            </li>
            <li style={{ "--i": "#26ad80" }} className={counter == 3 ? "active-menu " : ""} onClick={() => currentComponentHandler(3)}>
              <i className='bi bi-basket-fill' ></i>
              Orders
            </li>
            <li style={{ "--i": "#fe8907" }} className={counter == 4 ? "active-menu " : ""} onClick={() => currentComponentHandler(4)}>
              <i className='bi bi-people-fill' ></i>
              Users
            </li>
          </ul>
        </div>
        <div className='info-panel' ref={infoPanel}>
          <span className='full-screen-panel' onClick={handleFullScreen} ><i className='bi bi-filter-left'></i></span>
          <div className='panel-container'>
            <currentComponent.component />
            <SmallLoading visible={state?.loading} backgroundColor={'#262837'} />
          </div>
        </div>
      </div> : <NotFound />
  )
}

export default AdminPanel