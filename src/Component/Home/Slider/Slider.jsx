import React, { useEffect, useRef, useState } from 'react'
import "./Slider.css"
import { BytesToFile } from "../../Utils/BytesToFile"
import { Link } from "react-router-dom"

function Slider({ size = 5, delay = 8, counter = 0 }) {
    let [products, setProducts] = useState([]);
    const slides = useRef();
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
        const interval = window.setInterval(() => {
            next();
        }, (delay * 1000));
        return () => {
            clearInterval(interval);
        }


    }, [])

    const next = () => {
        counter -= 100;
        if (counter <= (-(size) * 100)) {
            counter = 0
            slides.current.style.transition = "transform 0s ease";
        }else{
            slides.current.style.transition = "transform 2s cubic-bezier(0.71, 0.15, 0.3, 0.81)";
        }
        slides.current.style.transform = `translateX(${counter}vw)`;
    }
    const prev = () => {
        counter += 100;
        if (counter >= 100) {
            counter = -(size) * 100
            slides.current.style.transition = "transform 0s ease";
        }else{
            slides.current.style.transition = "transform 2s cubic-bezier(0.71, 0.15, 0.3, 0.81)";
        }
        slides.current.style.transform = `translateX(${counter}vw)`;
    }
    return (
        <div className='slider'>
            <div className='slider-container'>
                <i className='slide-to-left bi bi-chevron-left' onClick={prev}></i>
                <div className='slides'>
                    <div className='slides-container' ref={slides}>
                        {products.map(item => {
                            return (
                                <div className={`slider-item `} key={item.id}>
                                    <img className='slider-image' src={item.image} alt={item.name} />
                                    <div className='image-info'>
                                        <h1><span style={{ textTransform: "uppercase" }}>{item.name}</span></h1>
                                        <h2>UP TO 50% OFF ON TOP BRANDS</h2>
                                        <Link to={'/store/productdetails/' + item.id}>SHOP NOW</Link>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <i className='slide-to-right bi bi-chevron-right' onClick={next}></i>
            </div>
        </div>
    )
}

export default Slider