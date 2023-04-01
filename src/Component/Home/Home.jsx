import React, { useState, useEffect, useRef } from 'react'
import "./Home.css"
import Slider from './Slider/Slider'
import { useNavigate } from 'react-router-dom'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import ApiUrls from '../../Constants/ApiUrls'

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [topSales, setTopSates] = useState([])
    const sliderRef = useRef();
    const sliderItemRef = useRef();
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products')
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(data => {
                    var randomNumber = Math.random() * 10;
                    setTopSates(data.slice(randomNumber, randomNumber + 4));
                    setProducts(data);
                }).catch(error => {
                    getData();
                })
        }
        const getBrands = () => {
            fetch('http://localhost:8080/api/brands')
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(res.status)
                    }
                }).then(data => {
                    setBrands(data);
                }).catch(error => {
                    getBrands()
                })
        }
        getData();
        getBrands();

    }, [])

    function slideTo(direction) {
        const cardWidth = sliderItemRef.current.offsetWidth + 20;
        if (direction === "left") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft - cardWidth, 0)
        } else if (direction === "right") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft + cardWidth, 0)
        }
    }

    return (
        <div className={`home home-entering fade-in`}>
            {products.length > 0 ? <Slider size={18} products={products} /> : ""}

            <div className="features">
                <div className="container">
                    <div className="feature">
                        <i className='bi bi-truck'></i>
                        <div className="feature-text-container">
                            <h3>Free Shipping</h3>
                            <p>Order Over 90Km</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-recycle"></i>
                        <div className="feature-text-container">
                            <h3>30 Days Return</h3>
                            <p>for good issues</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-shield-lock-fill"></i>
                        <div className="feature-text-container">
                            <h3>Secure payments</h3>
                            <p>100% safe and secure</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-headset"></i>
                        <div className="feature-text-container">
                            <h3>Online support</h3>
                            <p>24 hours support</p>
                        </div>
                    </div>
                </div>
            </div>
            <FeaturedProducts category={"pc"} />

            <div className='popular-brands'>
                <h2 className='section-title'>
                    <span style={{ color: "var(--mainColor)" }}>Popular</span> Brands
                </h2>
                <div className='brands-container'>
                    {brands.map(brand => {
                        return (
                            <img src={brand.logo}
                                className='brand'
                                key={brand.id}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home