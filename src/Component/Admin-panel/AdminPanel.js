import React from 'react'
import "./AdminPanel.css"
import { useStateValue } from "../../StateProvider"
import { Link } from 'react-router-dom';
import NotFound from "../Pages/NotFoundPage/NotFound"

function AdminPanel() {
  const [state, dispatch] = useStateValue();
  console.log(state)
  return (
    state.userInfo.roles.includes("ADMIN")? 
    <div className='admin-panel'>
      <div className='admin-menu'>
        <div className='account-info'>
          <div>
            <img src='' alt='' />
            <h3>{state.userInfo?.name + " " + state.userInfo?.lastName}</h3>
            <p>{state.userInfo?.email}</p>
          </div>
          <Link to="/"><i className='bi bi-gear-fill' style={{"--i":"#2f3142"}}></i></Link>
        </div>
        <span className='text-menu'>menu</span>
        <ul className='menu-list'>
          <li style={{ "--i": "#6969d9" }}><i className='bi bi-house-door-fill' ></i> Dashboard</li>
          <li style={{ "--i": "#32a7e1" }}><i className='bi bi-box' ></i> Products</li>
          <li style={{ "--i": "#b44ac6" }}><i className='bi bi-boxes' ></i> Categories</li>
          <li style={{ "--i": "#26ad80" }}><i className='bi bi-credit-card-2-front-fill' ></i> Orders</li>
          <li style={{ "--i": "#fe8907" }}><i className='bi bi-people-fill' ></i> Users</li>
        </ul>
      </div>
      <div className='info-panel'>
        right side
      </div>
    </div> :<NotFound />
  )
}

export default AdminPanel