import React from 'react'
import './Description.css'

const Description = (props) => {

    return (
        <div className={`description-content description-content-entering`}>
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

    )
}

export default Description