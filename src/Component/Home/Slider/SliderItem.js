import React from 'react'
import "./Slider.css"
import Button from "../../UI/Button/Button"
import { useNavigate } from 'react-router-dom'

export function SliderItem({image , animate, name ,id}) {
    const navigate = useNavigate()
    return (
        <div className={`slider-item ${animate}`}>
            <img className='slider-image' src={image} alt={name} />
            <div className='image-info'>
                <h1><span style={{textTransform:"uppercase"}}>{name}</span></h1>
                <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                <Button click={()=> navigate('/store/productdetails/' + id)}>SHOP NOW</Button>
            </div>
        </div>
    )
}
export function SliderItem1({image, animate, name, id}) {
    const navigate = useNavigate()
    return (
        <div className={`slider-item ${animate}`}>
            <img className='slider-image' src={image} alt={name} />
            <div className='image-info'>
                <h1><span style={{textTransform:"uppercase"}}>{name}</span></h1>
                <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                <Button click={()=> navigate('/store/productdetails/' + id)}>SHOP NOW</Button>
            </div>
        </div>
    )
}
const sliderItems = [SliderItem, SliderItem1]
export default sliderItems