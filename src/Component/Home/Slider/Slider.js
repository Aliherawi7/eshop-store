import React, { useState } from 'react'
import "./Slider.css"
import Products from '../../../products'
import SliderItems from "./SliderItem"

let counter = 0;

//for slider animation onclick
const animations = {
    LEFT_TO_RIGHT: 'left-to-right',
    RIGHT_TO_LEFT: 'right-to-left',
}
function Slider() {
    const [Product, setProduct] = useState({
        component: SliderItems[counter],
        animate: animations.LEFT_TO_RIGHT
    });

    const next = () => {
        counter++;
        if (counter >= Products.length - 1) {
            counter = 0;
        }
        setProduct({ component: SliderItems[counter % 2], animate: animations.RIGHT_TO_LEFT })
    }
    const prev = () => {
        counter--;
        if (counter <= -1) {
            counter = Products.length - 1
        }
        setProduct({ component: SliderItems[counter % 2], animate: animations.LEFT_TO_RIGHT })
    }
    return (
        <div className='slider'>
            <div className='slider-container'>
                <i className='slide-to-left bi bi-chevron-left' onClick={prev}></i>
                {<Product.component
                    image={Products[counter]?.image}
                    animate={Product?.animate}
                    name={Products[counter]?.name}
                    id={counter + 1}
                />}
                <i className='slide-to-right bi bi-chevron-right' onClick={next}></i>
            </div>
        </div>
    )
}

export default Slider