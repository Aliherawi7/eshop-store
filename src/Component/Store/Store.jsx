import React, { useState, useEffect } from 'react'
import "./Store.css"
import SmallLoading from '../UI/Loading/SmallLoading'
import Product from './Product/Product'
import useFetch from "../../Hook/useFetch"
import ApiUrls from '../../Constants/ApiUrls'
import NotFound from "../Pages/NotFoundPage/NotFound"

const Store = () => {
    let productsElement;
    const [products, setProducts] = useState([]);
    const [sortedProduct, setSortedProduct] = useState([])
    const { data, error, loading } = useFetch(ApiUrls.hostName + ApiUrls.products.allProducts(0, 15));
    const [categoryCounter, setCategoryCounter] = useState(0)
    const [sortByCounter, setSortByCounter] = useState(0);

    useEffect(() => {
        const dataArray = []
        for (let d in data) {
            let item = data[d];
            dataArray.push(item);
        }
        setProducts(dataArray);
        setSortedProduct(data)

    }, [data])

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

    // if data is loading
    if (loading) {
        productsElement = (
            <SmallLoading visible={true} position="absolute" top="100px" left="0" bottom="0" />
        )
    }
    // if fetching data operation has failed the not found page will be show
    if (error) {
        productsElement = (<NotFound />)
    }

    // if data has been fetched
    if (data) {
        productsElement = (
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
                        className={sortByCounter == 2 ? "active" : ""}
                        onClick={() => sortBy("", 2)} >
                        Most Popular</span>
                    <span
                        onClick={() => sortBy("", 3)}
                        className={sortByCounter == 3 ? "active" : ""} >
                        Cheapest</span>
                    <span
                        onClick={() => sortBy("", 4)}
                        className={sortByCounter == 4 ? "active" : ""} >
                        Most Expensive</span>
                </div>
                <div className="product-list">
                    {sortedProduct?.map((item) => (
                        <Product
                            id={item.productId}
                            image={item.images[0]}
                            name={item.name}
                            price={item.price}
                            rating={item?.rate}
                            key={item.productId}
                            color={item.color}
                            discount={item.discount}
                            quantityInDepot={item.quantityInDepot}
                        />
                    ))}
                </div>
            </div>
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

            <section style={{ position: "relative" }}>
                {productsElement}
            </section>
        </div>
    )
}

export default Store