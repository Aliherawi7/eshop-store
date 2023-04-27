import React, { useState, useEffect, useCallback } from 'react'
import "./Store.css"
import SmallLoading from '../UI/Loading/SmallLoading'
import Product from './Product/Product'
import useFetch from "../../Hook/useFetch"
import ApiUrls from '../../Constants/ApiUrls'
import NotFound from "../Pages/NotFoundPage/NotFound"
import { useRef } from 'react'
import Spinner from '../UI/Loading/Spinner'

const Store = () => {
    let productsElement;
    const [pagination, setPagination] = useState({ offset: 0, pageSize: 15 });
    const [InfiniteScrollLoading, setInfiniteScrollLoading] = useState(true);
    const [endOfPage, setEndOfPage] = useState(false)
    const [sortedProduct, setSortedProduct] = useState([])
    const { data, error, loading, hasMore } = useFetch(ApiUrls.hostName + ApiUrls.products.allProducts(pagination.offset, pagination.pageSize));
    const [categoryCounter, setCategoryCounter] = useState(0)
    const [sortByCounter, setSortByCounter] = useState(0);
    const lastNode = useRef();

    useEffect(() => {
        const dataArray = []
        for (let d in data) {
            let item = data[d];
            dataArray.push(item);
        }
        setSortedProduct(dataArray)

    }, [data, pagination])

    const lastNodeReference = node => {
        if (loading) return;
        if (lastNode.current) lastNode.current.disconnect();

        lastNode.current = new IntersectionObserver(enteries => {
            if (enteries[0].isIntersecting) {

                if (hasMore) {
                    setPagination({ offset: pagination.offset + 1, pageSize: pagination.pageSize })
                } else {
                    setEndOfPage(true)
                    setInfiniteScrollLoading(false)
                }
            }
        })
        if (node) lastNode.current.observe(node);
    }


    // this function is used to sort products by category
    const sortByCategory = (type, id) => {
        const sortProduct = []
        data.forEach(item => {
            if (item.keywords?.toLowerCase().includes(type.toLowerCase())) {
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
    if (error) { // if fetching data operation has failed the not found page will be show
        productsElement = (<NotFound />)
    } else if (data) {// if data has been fetche
        productsElement = (
            <div className="store fade-in">
                <div className='sort-product'>
                    <span className='sort-title'><i className='bi bi-sort-down'></i> Sort based on : </span>
                    <span
                        className={sortByCounter === 0 ? "active" : ""}
                        onClick={() => sortBy("", 0)}>All</span>
                    <span
                        className={sortByCounter === 1 ? "active" : ""}
                        onClick={() => sortBy("", 1)}>
                        Newest</span>
                    <span
                        className={sortByCounter === 2 ? "active" : ""}
                        onClick={() => sortBy("", 2)} >
                        Most Popular</span>
                    <span
                        onClick={() => sortBy("", 3)}
                        className={sortByCounter === 3 ? "active" : ""} >
                        Cheapest</span>
                    <span
                        onClick={() => sortBy("", 4)}
                        className={sortByCounter === 4 ? "active" : ""} >
                        Most Expensive</span>
                </div>
                <div className="product-list">
                    {sortedProduct?.map((item, index) => {
                        if (sortedProduct.length === index + 1) {

                            return <Product
                                customeRef={lastNodeReference}
                                id={item?.productId}
                                image={item?.images[0]}
                                name={item?.name}
                                price={item?.price}
                                rating={item?.rate}
                                key={item?.productId}
                                color={item?.color}
                                discount={item?.discount}
                                priceAfterDiscount={item?.priceAfterDiscount}
                                quantityInDepot={item?.quantityInDepot}
                            />
                        }
                        return <Product
                            id={item?.productId}
                            image={item?.images[0]}
                            name={item?.name}
                            price={item?.price}
                            rating={item?.rate}
                            key={item?.productId}
                            color={item?.color}
                            discount={item?.discount}
                            priceAfterDiscount={item?.priceAfterDiscount}
                            quantityInDepot={item?.quantityInDepot}
                        />
                    })}
                </div>
            </div>
        )

    }
    return (
        <div className={`store store-entering`}>
            <h2 className="product">Categories</h2>
            <div className='product-categories'>
                <span className={categoryCounter === 0 ? "active" : ""}
                    onClick={() => sortByCategory("", 0)} >
                    <i className='bi bi-collection-fill'></i>
                    All
                </span>
                <span
                    className={categoryCounter === 1 ? "active" : ""}
                    onClick={() => sortByCategory("pc", 1)} >
                    <i className='bi bi-laptop-fill'></i>
                    PC and accessories
                </span>
                <span
                    className={categoryCounter === 2 ? "active" : ""}
                    onClick={() => sortByCategory("mobile", 2)}>
                    <i className='bi bi-phone-fill'></i>
                    Phone and accessories
                </span>
                <span
                    className={categoryCounter === 3 ? "active" : ""}
                    onClick={() => sortByCategory("tv", 3)}>
                    <i className='bi bi-display-fill'></i>
                    TV and accessories
                </span>
                <span
                    className={categoryCounter === 4 ? "active" : ""}
                    onClick={() => sortByCategory("tools", 4)}>
                    <i className='bi bi-earbuds'></i>
                    Other
                </span>
            </div>

            <section style={{ position: "relative" }}>
                {productsElement}
                {InfiniteScrollLoading && <Spinner />}
                {endOfPage && <h5 style={{ textAlign: "center" }}>you have seen all the products</h5>}
            </section>
        </div>
    )
}

export default Store