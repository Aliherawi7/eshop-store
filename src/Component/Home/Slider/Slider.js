import React, { useState } from 'react'
import "./Slider.css"
import Button from "../../UI/Button/Button"
import Products from '../../../products'
import sliderItems from "./SliderItem"
let counter = 0;

//for slider animation onclick
const animations= {
    LEFT_TO_RIGHT: 'left-to-right',
    RIGHT_TO_LEFT: 'right-to-left',
}
function Slider() {
    const [product, setProduct] = useState({component:sliderItems[counter], animate:""});
    
    const next = ()=>{
        counter++;
        if(counter >=Products.length-1){
            counter=0; 
        }
        setProduct({component:sliderItems[counter%2],animate:animations.RIGHT_TO_LEFT})
    }
    const prev = ()=>{
        counter--;
        if(counter <=-1){
            counter = Products.length-1 
        }
        setProduct({component:sliderItems[counter%2],animate:animations.LEFT_TO_RIGHT})
    }
    return (
        <div className='slider'>
            <div className='slider-container'>
                <i className='slide-to-left bi bi-chevron-left' onClick={prev}></i>
                {<product.component 
                    image={Products[counter]?.image}
                    animate={product?.animate}
                    name={Products[counter]?.name}
                    id={counter+1}
                    />}
                <i className='slide-to-right bi bi-chevron-right' onClick={next}></i>
            </div>
        </div>
    )
}

export default Slider