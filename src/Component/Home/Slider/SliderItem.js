import React from 'react'
import "./Slider.css"
import Button from "../../UI/Button/Button"

function SliderItem({image , animate, name}) {
    console.log(image)
    return (
        <div className={`slider-item ${animate}`}>
            <img className='slider-image' src={image} alt='' />
            <div className='image-info'>
                <h1><span style={{textTransform:"uppercase"}}>{name}</span></h1>
                <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                <Button>SHOP NOW</Button>
            </div>
        </div>
    )
}
function SliderItem1({image, animate, name}) {
    console.log(image)
    return (
        <div className={`slider-item ${animate}`}>
            <img className='slider-image' src={image} alt='' />
            <div className='image-info'>
                <h1><span style={{textTransform:"uppercase"}}>{name}</span></h1>
                <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                <Button>SHOP NOW</Button>
            </div>
        </div>
    )
}
const sliderItems = [SliderItem, SliderItem1]
export default sliderItems