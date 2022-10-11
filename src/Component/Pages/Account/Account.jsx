import React from 'react'
import "./Account.css"

function Account() {
  return (
    <div className='account-setting fade-in'>
         <h1>{localStorage.getItem("name")} {localStorage.getItem("lastName")}
          </h1>
    </div>
  )
}

export default Account