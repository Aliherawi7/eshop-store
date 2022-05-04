import React, { useState } from 'react'
import './SearchPage.css'
import { Transition } from 'react-transition-group'
import Button from '../../UI/Button/Button'
import Product from '../../Store/Product/Product'
import { useParams, useNavigate } from 'react-router-dom'
import products from '../../../products'
import NotFound from '../NotFoundPage/NotFound'
const SearchPage = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState({value:id})
    const [product, setProduct] = useState(findItems(id))
    const inputChangeHandler = (event) => {
        setSearchInput({ value: event.target.value })
        setProduct(findItems(event.target.value))
        if(event.target.value ==='' || product.length <0){
            setProduct([])    
        }
    }
    function findItems(text){
        return products.filter((item) => {
            const newId = text.toString().toLowerCase().trim()
            if (item.name.toLowerCase().search(newId) >= 0) {
                return item
            }
        })
    }
    console.log(product)
    return (
        <Transition timeout={500} in={true} appear>
            {status => (
                <div className={`search-page search-${status}`}>
                    <div className="search-box">
                        <input name="search" value={searchInput.value} onChange={(event) => (inputChangeHandler(event))} placeholder="what do you need?" />
                        <Button btnType="success"><i className="bi bi-search"></i> search</Button>
                    </div>
                    <hr />

                    <div className="product-list">
                        {product.length == 0 ? <NotFound size="small"/> : product?.map((item) => (
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

            )}
        </Transition>
    )
}
export default SearchPage