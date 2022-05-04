import React, { useRef, useEffect } from 'react'
import './Slider.css'
import Products from '../../products';
import Product from '../Store/Product/Product';

const Slider = () => {
    let productList = Products.map((item) => {
        return <div className="card-container" key={item.id}>
            <Product
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rate}
            />
        </div>
    })
    const SliderRef = useRef()
    const trackRef = useRef()
    let width;
    let interval
    useEffect(()=>{
        width = -SliderRef.current.offsetWidth
        interval = setInterval(next, 3000)  
    })
    const next = () => {
        if(window.location.pathname !=='/'){
            clearInterval(interval)
        }
        
        if(width <= -trackRef.current.offsetWidth){
            width = 0
            trackRef.current.style.transition = `transform 0.09s`
        }else{
            trackRef.current.style.transition = `transform 0.3s`
        }
        trackRef.current.style.transform = `translateX(${width}px)`
        width -= SliderRef.current.offsetWidth
    }

    return (
        <div className="slider-container" ref={SliderRef}>
            <div className="track" ref={trackRef}>
                {productList}
            </div>
        </div>
    )
}

export default Slider