import React, { useState, useEffect } from 'react'
import "./Home.css"
import Feature from './features/feature'
import Slider from './Slider/Slider'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { BytesToFile } from '../Utils/BytesToFile'

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [topSales, setTopSates]= useState([])
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products')
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(data => {
                    setTopSates(data.slice(5, 8))
                    setProducts(data)
                })
        }
        getData();
        

    }, [])

    return (
        <div className={`home home-entering`}>
            <Slider size={10} />
            <div className='most-ordered'>
                {topSales?.map(item => {
                    return (
                        <div className='ordered-item' key={item.id}>
                            <img src={BytesToFile(item.image)} />
                            <div className='order-info'>
                                <h1>{item.name}</h1>
                                <Button click={() => navigate('/store/productdetails/' + item.id)}>SHOP NOW</Button>
                            </div>
                        </div>)
                })}
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