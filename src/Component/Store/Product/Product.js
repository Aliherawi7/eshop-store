import React from 'react'
import "./product.css"
import Button from '../../UI/Button/Button'
import { useStateValue } from '../../../StateProvider'
import { useNavigate } from 'react-router-dom'
import RateStar from '../Rate-Star/RateStar'

const Product = ({ image, id, name, price, rating }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useStateValue()
    const addToBasket = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: name,
                image: image,
                price: price,
                rating: rating,
                id: id
            }
        })
    }

    return (
        <section className="card" onClick={() => navigate('/store/productdetails/' + id)}>
            <div className="product-info">
            <h4>{name}</h4>
            <h5>${price}</h5>
            <RateStar rate={rating} size={'small'} />
            </div>
            <img src={image} alt="slider" />
            <div className="card-info">
                <Button btnType="outline" click={(e) => (addToBasket(e))}>
                    Add <i className="bi bi-cart4"></i>
                </Button>
            </div>
        </section>
    )
}
export default Product