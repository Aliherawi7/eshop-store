import React from 'react'
import "./Store.css"
import Loading from '../UI/Loading/Loading'
import Products from '../../products'
import Product from './Product/Product'

const Store = () => {
    let producstElement;
    if (Products) {
        producstElement = (
            <div className="store store-entering">
                <div className="product-list">
                    {Products.map((item) => (
                        <Product
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        )
    } else {
        producstElement = (
            <Loading />
        )
    }
    return (
        <div className={`store store-entering`}>
            <h2 className="product">Products</h2>
            {producstElement}
        </div>
    )
}

export default Store