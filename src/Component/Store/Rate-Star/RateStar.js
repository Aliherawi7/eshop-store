import React from 'react'
import './RateStar.css'
function RateStar({ size, rate, type }) {
    return (
        <div className={`product-rate  star-rate-${size}`}>
            {Array(rate).fill().map((item)=>{
                return <i key={Math.random()} className="start-logo bi bi-star-fill" ></i>
            })}
            <span style={{paddingLeft:'5px'}}>{type}</span>
        </div>
    )
}

export default RateStar
