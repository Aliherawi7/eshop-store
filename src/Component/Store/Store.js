import React from 'react'
import { Transition } from "react-transition-group"
import "./Store.css"
import Loading from '../UI/Loading/Loading'
import Products from '../../products'
import Product from './Product/Product'

const Store = () => {
    let producstElement;
    if (Products) {
        producstElement = (
            <div className="store">
                <div className="product-list">
                    {Products.map((item) => (
                        <Product
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
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
        <Transition timeout={500} in={true} appear>
            {(status) => (
                <div className={`store store-${status}`}>
                    <h2 className="product">Products</h2>
                    {producstElement}
                </div>
            )}
        </Transition>
    )
}

export default Store