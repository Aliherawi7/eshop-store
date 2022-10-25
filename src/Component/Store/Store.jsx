import React, { useState, useEffect } from 'react'
import "./Store.css"
import SmallLoading from '../UI/Loading/SmallLoading'
import Product from './Product/Product'
import { BytesToFile } from '../Utils/BytesToFile'

const Store = () => {
    let producstElement;
    const [products, setProducts] = useState([]);
    const [sortedProduct, setSortedProduct] = useState([])
    const [categoryCounter, setCategoryCounter] = useState(0)
    const [sortByCounter, setSortByCounter] = useState(0);
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products').then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                data.map(item => {
                    item.image = BytesToFile(item.image, { contentType: "image/png" })
                    return item
                })
                setProducts(data);
                setSortedProduct(data)
            })
        }

        return getData();
    }, [])

    const sortByCategory = (type, id) => {

        const sortProduct = []
        products.forEach(item => {
            if (item.category.toLowerCase().includes(type.toLowerCase())) {
                sortProduct.push(item)
            }
        })
        setCategoryCounter(id)
        setSortedProduct(sortProduct)
    }

    const sortBy = (type, id) => {

        setSortByCounter(id);
    }

    if (products.length >0) {
        producstElement = (
            <div className="store fade-in">
                <div className='sort-product'>
                    <span className='sort-title'><i className='bi bi-sort-down'></i> Sort based on : </span>
                    <span
                        className={sortByCounter == 0 ? "active" : ""}
                        onClick={() => sortBy("", 0)}>All</span>
                    <span
                        className={sortByCounter == 1 ? "active" : ""} 
                        onClick={() => sortBy("", 1)}>
                        Newest</span>
                    <span 
                    className={sortByCounter == 2 ? "active":""}
                    onClick={() => sortBy("", 2)} >
                        Most Popular</span>
                    <span 
                    onClick={() => sortBy("", 3)}
                    className={sortByCounter == 3 ? "active":""} >
                        Cheapest</span>
                    <span 
                    onClick={() => sortBy("", 4)}
                    className={sortByCounter == 4 ? "active":""} >
                        Most Expensive</span>
                </div>
                <div className="product-list">
                    {sortedProduct.map((item) => (
                        <Product
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            key={item.id}
                            color={item.color}
                            discount={item.discount}
                        />
                    ))}
                </div>
            </div>
        )
    } else {
        console.log("in else")
        producstElement = (
            <SmallLoading visible={true} position="absolute" top="100px" left="0" bottom="0"/>
        )
    }
    return (
        <div className={`store store-entering`}>
            <h2 className="product">Categories</h2>
            <div className='product-categories'>
                <span className={categoryCounter == 0 ? "active" : ""}
                    onClick={() => sortByCategory("", 0)} >
                    <i className='bi bi-collection-fill'></i>
                    All
                </span>
                <span
                    className={categoryCounter == 1 ? "active" : ""}
                    onClick={() => sortByCategory("pc", 1)} >
                    <i className='bi bi-laptop-fill'></i>
                    PC and accessories
                </span>
                <span
                    className={categoryCounter == 2 ? "active" : ""}
                    onClick={() => sortByCategory("mobile", 2)}>
                    <i className='bi bi-phone-fill'></i>
                    Phone and accessories
                </span>
                <span
                    className={categoryCounter == 3 ? "active" : ""}
                    onClick={() => sortByCategory("tv", 3)}>
                    <i className='bi bi-display-fill'></i>
                    TV and accessories
                </span>
                <span
                    className={categoryCounter == 4 ? "active" : ""}
                    onClick={() => sortByCategory("tools", 4)}>
                    <i className='bi bi-earbuds'></i>
                    Other
                </span>

            </div>

            <section style={{position:"relative"}}>
                {producstElement}
            </section>
        </div>
    )
}

export default Store