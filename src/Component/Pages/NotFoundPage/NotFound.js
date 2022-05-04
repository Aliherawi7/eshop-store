import React from 'react'
import './NotFound.css'
import Transition from 'react-transition-group/cjs/Transition'

const NotFound = (props) => {
    return (
        <Transition timeout={500} in={true} appear>
            {status => (
                <div className={`not-found-page not-found-${status}`}>
                    <i className={`bi bi-emoji-frown ${props.size}`}></i>
                    <h2 className={props.size}> Not found </h2>
                </div>
            )}

        </Transition>
    )
}
export default NotFound