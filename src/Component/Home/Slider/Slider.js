import React, { useState } from 'react'
import "./Slider.css"
import Button from "../../UI/Button/Button"
import Products from '../../../products'

let counter = 0;
function Slider() {
    const [product, setProduct] = useState({temp: Products[counter]});
    const next = ()=>{
        counter++;
        if(counter >=Products.length-1){
            counter=0; 
        }
        setProduct({temp: Products[counter]})
    }
    const prev = ()=>{
        counter--;
        if(counter <=-1){
            counter = Products.length-1 
        }
        setProduct({temp: Products[counter]})
    }
    return (
        <div className='slider'>
            <div className='slider-container'>
                {counter}
                <i className='slide-to-left bi bi-chevron-left' onClick={prev}></i>
                <div className='slider-item'>
                    <img className='slider-image' src={product.temp.image} alt='' />
                    <div className='image-info'>
                        <h1>TRENDY LABTOP</h1>
                        <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                        <Button>SHOP NOW</Button>
                    </div>
                </div>
                <i className='slide-to-right bi bi-chevron-right' onClick={next}></i>
            </div>
        </div>
    )
}

export default Slider