import React, { useState } from 'react'
import './SearchPage.css'
import Button from '../../UI/Button/Button'
import Product from '../../Store/Product/Product'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFoundPage/NotFound'
const SearchPage = () => {
    const { id } = useParams()
    const [searchInput, setSearchInput] = useState({ value: id })
    const [product, setProduct] = useState(findItems(id))
    const inputChangeHandler = (event) => {
        setSearchInput({ value: event.target.value })
        setProduct(findItems(event.target.value))
        if (event.target.value === '' || product.length < 0) {
            setProduct([])
        }
    }
    function findItems(text) {
        fetch("").then(res => {
            if(res.ok){
                return res.json();
            }
        }).then(data => {
            return data;
        })
        return ''
    }
    return (
        <div className={`search-page search-entering`}>
            <div className="search-box">
                <input name="search" value={searchInput.value} onChange={(event) => (inputChangeHandler(event))} placeholder="what do you need?" />
                <Button btnType="success"><i className="bi bi-search"></i> search</Button>
            </div>
            <hr />

            <div className="product-list">
                {product.length == 0 ? <NotFound size="small" /> : product?.map((item) => (
                    <Product
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        rating={item.rate}
                    />
                ))}
            </div>
        </div>
    )
}
export default SearchPage