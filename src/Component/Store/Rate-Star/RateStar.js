import React from 'react'
import './RateStar.css'
function RateStar({ size, rate, type }) {
    return (
        <div className={`product-rate  star-rate-${size}`}>
            {Array(rate).fill().map((item)=>{
                return <i key={Math.random()} className="bi bi-star-fill" style={{padding:'3px',color:'#e7d427ee'}}></i>
            })}
            <span style={{paddingLeft:'5px'}}>{type}</span>
        </div>
    )
}

export default RateStar
