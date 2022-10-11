import React from 'react'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className={`not-found-page not-found-entering`}>
            <img
                src={
                    require("../../../assets/Oops 404 Error with a broken robot-cuate.svg")
                        .default
                }
                alt="404 page"
            />
        </div>
    )
}
export default NotFound