import React, { useState, useEffect } from 'react'
import './RateStar.css'
function RateStar({ size, rate, type }) {
    
    return (
        <div className={`product-rate  star-rate-${size}`}>
            {Array(rate).fill().map(() => {
                return <i key={Math.random()} className="star-fill bi bi-star-fill" ></i>
            })}
            {Array(5 - rate).fill().map(() => {
                return <i key={Math.random()} className="star-empty bi bi-star-fill" ></i>
            })}
            <span style={{ paddingLeft: '5px' }}>{type}</span>
        </div>
    )
}

export default RateStar
