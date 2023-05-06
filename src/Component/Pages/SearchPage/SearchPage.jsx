import React, { useState } from 'react'
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
    const { data, error, loading, setData } = useFetch(ApiUrls.hostName + ApiUrls.products.findProducts + `keyword=${searchKey}`);

    let productsElement;

    const findItems = () => {

        setData([])
        setSearchKey(searchInput)
    }
    const findItemByPressingEnter = (e) => {
        if (e.key == "Enter") {
            findItems()
        }
    }
    if (data?.length > 0) {
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
    } else if (loading) {
        productsElement = <Laoding />
    } else if (error) {
        productsElement = (
            <NotFound />
        )
    }

    return (
        <div className={`search-page search-entering`}>
            <div className="search-box">
                <input name="search" value={searchInput} onKeyUp={(e) => findItemByPressingEnter(e)} onChange={(event) => (setSearchInput(event.target.value))} placeholder="what do you need?" />
                <Button btnType="success" click={findItems}><i className="bi bi-search"></i> search</Button>
            </div>
            <hr />
            {productsElement}
        </div>
    )
}
export default SearchPage