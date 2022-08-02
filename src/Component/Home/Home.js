import React from 'react'
import "./Home.css"
import Feature from './features/feature'
import Products from "../../products"
import Slider from './Slider/Slider'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={`home home-entering`}>
            <Slider />
            <div className='most-ordered'>
                <div className='ordered-item'>
                    <img src={Products[8].image} />
                    <div className='order-info'>
                        <h1>{Products[8].name}</h1>
                        <Button click={() => navigate('/store/productdetails/' + 9)}>SHOP NOW</Button>
                    </div>
                </div>
                <div className='ordered-item'>
                    <img src={Products[7].image} />
                    <div className='order-info'>
                        <h1>{Products[7].name}</h1>
                        <Button click={() => navigate('/store/productdetails/' + 8)}>SHOP NOW</Button>
                    </div>
                </div>
                <div className='ordered-item'>
                    <img src={Products[6].image} />
                    <div className='order-info'>
                        <h1>{Products[6].name}</h1>
                        <Button click={() => navigate('/store/productdetails/' + 7)}>SHOP NOW</Button>
                    </div>
                </div>
            </div>
            <div className="features">
                <h2>eShop Features</h2>
                <div className="container">
                    <Feature iconName="bi bi-cart-check-fill" featureTitle="Free Shipping" featureText="Order Over 90Km" />
                    <Feature iconName="bi bi-display" featureTitle="30 Days Return" featureText="for good issues" />
                    <Feature iconName="bi bi-shield-lock-fill" featureTitle="secure payments" featureText="100% safe and secure" />
                    <Feature iconName="bi bi-telephone-inbound-fill" featureTitle="24/7 support" featureText="24 hours support" />
                </div>
            </div>
        </div>
    )
}

export default Home