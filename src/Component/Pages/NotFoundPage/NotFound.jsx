import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className={`not-found-page not-found-entering`}>
            <h1>ERROR 404</h1>
            <p>The requested URL was not found on this server.</p>
            <p>THAT IS ALL WE KNOW.</p>
            <Link to="/">Back to home page</Link>
        </div>
    )
}
export default NotFound