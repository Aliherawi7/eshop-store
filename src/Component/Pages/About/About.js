import React,{useEffect} from 'react'
import Button from '../../UI/Button/Button'
import "./About.css"

function About() {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    return (
        <div className='about about-entring'>
            <h1 className='about-us'>about us</h1>
            <div className='part-a'>
                <div className='part-a-container'>
                    <img src='/image/slide-17.jpg' alt='products' />
                    <div className='eshop-desc'>
                        <h2>Our Story</h2>
                        <p>
                            we get our name from Electronic Shop, meaning: we have everything you need from electric products
                            . We value each customer in our day to day life, as well as in our products
                        </p>
                        <Button>READ MORE</Button>
                    </div>
                </div>
            </div>
            <div className='part-b'>
                <h2>visit one of our 5 locations</h2>
                <div className='locations'>
                <img src='/image/locations.png' alt='eshop location'/>
                </div>
            </div>
        </div>
    )
}

export default About