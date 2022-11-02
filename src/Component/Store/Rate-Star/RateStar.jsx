import React from 'react'
import './RateStar.css'
function RateStar({ size, rate, type }) {

    if(rate < 0 && rate >5){
        rate = 4
    }
    return (
        <div className={`product-rate  star-rate-${size}`}>
            {Array(Number.parseInt(rate)).fill().map(() => {
                return <i key={Math.random()} className="star-fill bi bi-star-fill" ></i>
            })}
            {Array(5 - Number.parseInt(rate)).fill().map(() => {
                return <i key={Math.random()} className="star-empty bi bi-star-fill" ></i>
            })}
            <span style={{ paddingLeft: '5px' }}>{type}</span>
        </div>
    )
}

export default RateStar
