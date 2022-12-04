import React, { useState, useEffect } from 'react'
import './SearchPage.css'
import Button from '../../UI/Button/Button'
import Product from '../../Store/Product/Product'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFoundPage/NotFound'
import { BytesToFile } from '../../../Utils/BytesToFile'
const SearchPage = () => {
    const { id } = useParams()
    const [searchInput, setSearchInput] = useState(id)
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        findItems()

    }, [])

    function findItems() {
        fetch("http://localhost:8080/api/products/find?all=" + searchInput)
        .then(res => {
            if (res.ok) {
                return res.json();
            }else{
                throw new Error(res.status)
            }
        }).then(data => {
            data.map(item => {
                item.images = item.images.map(image =>{
                    return BytesToFile(image ,"image/png")
                })
            })
            console.log(data)
            setProducts(data)
        }).catch( error => console.log(error))
    }

return (
    <div className={`search-page search-entering`}>
        <div className="search-box">
            <input name="search" value={searchInput} onChange={(event) => (setSearchInput(event.target.value))} placeholder="what do you need?" />
            <Button btnType="success" click={findItems}><i className="bi bi-search"></i> search</Button>
        </div>
        <hr />

        <div className="product-list">
            {products.length == 0 ? <NotFound size="small" /> : products?.map((item) => (
                <Product
                    id={item.productId}
                    image={item.images[0]}
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
}
export default SearchPage