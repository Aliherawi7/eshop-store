import React, { useState, useEffect } from 'react'
import './SearchPage.css'
import Button from '../../UI/Button/Button'
import Product from '../../Store/Product/Product'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFoundPage/NotFound'
import useFetch from "../../../Hook/useFetch"
import ApiUrls from "../../../Constants/ApiUrls"
import Laoding from "../../UI/Loading/Loading"
const SearchPage = () => {
    const { id } = useParams()
    const [searchInput, setSearchInput] = useState(id)
    const [searchKey, setSearchKey] = useState(id);
    const { data, error, loading } = useFetch(ApiUrls.hostName + ApiUrls.products.findProducts + `keyword=${searchKey}`);

    let productsElement;

    const findItems = () => {
        setSearchKey(searchInput)
    }

    if (loading) {
        productsElement = <Laoding />
    } else if (error || data?.length < 1) {
        productsElement = (
            <NotFound />
        )
    } else if (data) {
        productsElement = (
            <div className="product-list">
                {data?.map((item) => (
                    <Product
                        id={item.productId}
                        image={item.images[0]}
                        name={item.name}
                        price={item.price}
                        rating={item.rate}
                        key={item.productId}
                        color={item.color}
                        discount={item.discount}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={`search-page search-entering`}>
            <div className="search-box">
                <input name="search" value={searchInput} onChange={(event) => (setSearchInput(event.target.value))} placeholder="what do you need?" />
                <Button btnType="success" click={findItems}><i className="bi bi-search"></i> search</Button>
            </div>
            <hr />
            {productsElement}
        </div>
    )
}
export default SearchPage