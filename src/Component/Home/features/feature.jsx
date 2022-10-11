import React from 'react'
import "./feature.css"

const Feature =(props) =>{
    return(
        <div className="feature">
            <i className={props.iconName}></i>
            <div className="feature-text-container">
                <h3>{props.featureTitle}</h3>
                <p>{props.featureText}</p>
            </div>
        </div>
    )
}

export default Feature