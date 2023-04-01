import React, { useRef } from 'react'
import ApiUrls from '../../Constants/ApiUrls'
import "./FeaturedProducts.css"
import useFetch from '../../Hook/useFetch'
import FlexibleLoading from "../../Component/UI/Loading/FlexibleLoading"
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'

function FeaturedProducts({ category }) {
    const navigate = useNavigate();
    let Element;
    const sliderItemRef = useRef();
    const sliderRef = useRef();
    const { data, error, loading } = useFetch(ApiUrls.hostName + ApiUrls.products.findProducts + "category=" + category);

    if (loading) {
        Element = (<FlexibleLoading />)
    }
    if (error) {
        Element = (<h4> No Featured Products </h4>)
    }

    if (data) {
        Element = (
            <>
                <span className='scroll_btn' onClick={() => slideTo("left")}><i className='bi bi-chevron-left'></i></span>
                <div className='featured_product_slider' ref={sliderRef} draggable>
                    {data?.map(item => {
                        return (
                            <div className='ordered-item' key={item.productId} ref={sliderItemRef}>
                                <img src={item.images[0]} />
                                <div className='order-info'>
                                    <h1>{item.name}</h1>
                                    <Button click={() => navigate('/store/productdetails/' + item.productId)}>SHOP NOW</Button>
                                </div>
                            </div>)
                    })}
                </div>
                <span className='scroll_btn right' onClick={() => slideTo("right")}><i className='bi bi-chevron-right'></i></span>
            </>
        )
    }



    function slideTo(direction) {
        const cardWidth = sliderItemRef.current.offsetWidth + 20;
        if (direction === "left") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft - cardWidth, 0)
        } else if (direction === "right") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft + cardWidth, 0)
        }
    }

    return (
        <section className='featured_products'>
            <h2 className='section-title'>
                <span style={{ color: "var(--mainColor)" }}>Featured</span> Products
            </h2>
            <div className='featured_products_container' >
                {Element}
            </div>
        </section>
    )
}

export default FeaturedProducts