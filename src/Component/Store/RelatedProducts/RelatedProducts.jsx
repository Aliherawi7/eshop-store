import React, { useRef } from 'react'
import ApiUrls from '../../../Constants/ApiUrls'
import "./RelatedProducts.css"
import useFetch from '../../../Hook/useFetch'
import Product from '../Product/Product'
import FlexibleLoading from "../../UI/Loading/FlexibleLoading"

function RelatedProducts({ category }) {
    let Element;
    const sliderItemRef = useRef();
    const sliderRef = useRef();
    const { data, error, loading } = useFetch(ApiUrls.hostName + ApiUrls.products.findProducts + "category=" + category);

    if (loading) {
        Element = (<FlexibleLoading />)
    }
    if (error) {
        Element = (<h4> No Related Products </h4>)
    }
    if (data) {
        Element = (
            <>
                <span className='scroll_btn' onClick={() => slideTo("left")}><i className='bi bi-chevron-left'></i></span>
                <div className='related_product_slider' ref={sliderRef} draggable>
                    {data.map(item => {
                        return <Product
                            id={item.productId}
                            image={item.images[0]}
                            name={item.name}
                            price={item.price}
                            rating={item?.rate}
                            key={item.productId}
                            color={item.color}
                            discount={item.discount}
                            customeRef={sliderItemRef}
                        />
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
        <section className='related_products'>
            <h2 className='section-title'>
                <span style={{ color: "var(--mainColor)" }}>Related</span> Products
            </h2>
            <div className='related_product_container' >
                {Element}
            </div>

        </section>
    )
}

export default RelatedProducts