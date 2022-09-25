import React from 'react'
import "./AdminPanel.css"

function AdminPanel() {
  return (
    <div className='admin-panel'>
        <div className='admin-menu'>
          <div className='account-info'>account name</div>
          <span className='text-menu'>menu</span>
        </div>
        <div className='info-panel'>
          right side
        </div>
    </div>
  )
}

export default AdminPanel