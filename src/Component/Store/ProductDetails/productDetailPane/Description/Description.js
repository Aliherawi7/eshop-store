import React from 'react'
import './Description.css'
import Transition from 'react-transition-group/cjs/Transition'

const Description = (props) => {

    return (
        <Transition timeout={500} in={props.transition} appear>
            {(status) => (
                <div className={`description-content description-content-${status}`}>
                    <h4>Descriptions</h4>
                    <p>{props.description}
                    (This Data Is Static)
                    To make your document look professionally produced,
                     Word provides header, footer, cover page, and text 
                     box designs that complement each other. For example, 
                     you can add a matching cover page, header, and sidebar. 
                     Click Insert and then choose the elements you want from the different galleries.
                    </p>
                </div>
            )}
        </Transition>

    )
}

export default Description