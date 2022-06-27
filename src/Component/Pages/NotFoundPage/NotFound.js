import React from 'react'
import './NotFound.css'
import Transition from 'react-transition-group/cjs/Transition'

const NotFound = (props) => {
    return (
        <Transition timeout={500} in={true} appear>
            {status => (
                <div className={`not-found-page not-found-${status}`}>
                    <img
                        src={
                            require("../../../assets/Oops 404 Error with a broken robot-cuate.svg")
                                .default
                        }
                        alt="404 page"
                    />
                </div>
            )}

        </Transition>
    )
}
export default NotFound