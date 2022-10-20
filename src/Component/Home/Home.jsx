import React, { useState, useEffect } from 'react'
import "./Home.css"
import Slider from './Slider/Slider'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { BytesToFile } from '../Utils/BytesToFile'

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [topSales, setTopSates] = useState([])
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products')
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(data => {
                    var randomNumber = Math.random() * 10;
                    setTopSates(data.slice(randomNumber, randomNumber+4))
                    setProducts(data)
                })
            fetch('http://localhost:8080/api/brands')
                .then(res => {
                    console.log(res)
                    if (res.ok) {
                        return res.json();
                    }
                }).then(data => {
                    data.forEach(item => {
                        item.logo = BytesToFile(item.logo, "image/png")
                    })
                    console.log(data)
                    setBrands(data);
                })
        }
        getData();


    }, [])

    return (
        <div className={`home home-entering`}>
            <Slider size={18} />
            <div className="features">
                <div className="container">
                    <div className="feature">
                        <i className='bi bi-cart-check-fill'></i>
                        <div className="feature-text-container">
                            <h3>Free Shipping</h3>
                            <p>Order Over 90Km</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-display"></i>
                        <div className="feature-text-container">
                            <h3>30 Days Return</h3>
                            <p>for good issues</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-shield-lock-fill"></i>
                        <div className="feature-text-container">
                            <h3>secure payments</h3>
                            <p>100% safe and secure</p>
                        </div>
                    </div>
                    <div className="feature">
                        <i className="bi bi-telephone-inbound-fill"></i>
                        <div className="feature-text-container">
                            <h3>24/7 support</h3>
                            <p>24 hours support</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='most-ordered'>
                {topSales?.map(item => {
                    return (
                        <div className='ordered-item' key={item.id} style={{backgroundColor: item.color+"87"}}>
                            <img src={BytesToFile(item.image)} />
                            <div className='order-info'>
                                <h1>{item.name}</h1>
                                <Button click={() => navigate('/store/productdetails/' + item.id)}>SHOP NOW</Button>
                            </div>
                        </div>)
                })}
            </div>
            
            <div className='popular-brands'>
                <h2>Popular Brands</h2>
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