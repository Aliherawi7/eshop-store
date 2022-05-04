import React,{useState} from 'react'
import "./Home.css"
import Feature from './features/feature'
import GetStart from './GetStart/GetStart'
import {Transition} from 'react-transition-group'

const Home = () => {
    return (
        <Transition timeout={500} in={true}  appear>
            {(status) => (
                <div className={`home home-${status}`}>
                    <GetStart />
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
            )}

        </Transition>
    )
}

export default Home