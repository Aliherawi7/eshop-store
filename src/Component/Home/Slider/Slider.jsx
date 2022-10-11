import React, { useEffect, useState } from 'react'
import "./Slider.css"
import SliderItems from "./SliderItem"
import { BytesToFile } from "../../Utils/BytesToFile"

let counter = 1;

//for slider animation onclick
const animations = {
    LEFT_TO_RIGHT: 'left-to-right',
    RIGHT_TO_LEFT: 'right-to-left',
}
function Slider() {
    let [products, setProducts] = useState([]);

    const [slide, setSlide] = useState({
        component: SliderItems[counter % 2],
        animate: animations.LEFT_TO_RIGHT
    });
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products').then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                const p = data.map(item => {
                    item.image = BytesToFile(item.image)
                    return item
                });
                setProducts(p)
            })

        }
        getData();
        const interval = setInterval(() => {
            next();
        }, 4000)

        return () => {
            clearInterval(interval);
        }

    }, [])


    const next = () => {
        counter++;
        if (counter >= 10) {
            counter = 1;
        }
        setSlide({ component: SliderItems[counter % 2], animate: animations.RIGHT_TO_LEFT })

    }
    const prev = () => {
        counter--;
        if (counter <= 0) {
            counter = 10;
        }
        setSlide({ component: SliderItems[counter % 2], animate: animations.LEFT_TO_RIGHT })
    }

    return (
        <div className='slider'>
            <div className='slider-container'>
                <i className='slide-to-left bi bi-chevron-left' onClick={prev}></i>
                {<slide.component
                    image={products[counter]?.image}
                    animate={slide?.animate}
                    name={products[counter]?.name}
                    id={products[counter]?.id}
                />}
                <i className='slide-to-right bi bi-chevron-right' onClick={next}></i>
            </div>
        </div>
    )
}

export default Slider