import React from 'react'
import "./product.css"
import Button from '../../UI/Button/Button'
import { useStateValue } from '../../../StateProvider'
import { useNavigate } from 'react-router-dom'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'

const Product = ({ image, id, name, price, rating, color, discount }) => {
    const navigate = useNavigate()
    const [{ basket }, dispatch] = useStateValue()
    const addToBasket = (e) => {
        e.stopPropagation()
        const index = basket.findIndex(item => {
            return item.id == id;
        })

        if (index >= 0) {
            dispatch({
                type: actions.CHANGE_QUANTITY,
                item: {
                    id: id,
                    index: index,
                    quantity: basket[index].quantity + 1
                }
            })
            return;
        }
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: name,
                image: image,
                price: price,
                rating: rating,
                id: id,
                quantity: 1
            }
        })
    }

    return (
        <section className="card" onClick={() => navigate('/shop/productdetails/' + id)}>
            <span className='discount-logo'></span>
            <img src={image} alt="slider" />
            <RateStar rate={rating} size={'small'} />
            <div className="product-info">
                <h4>{name}</h4>
                <div className='product-price'>
                    {discount ?
                        <span className='before-discount'>
                            <sup><i className='bi bi-currency-dollar'></i></sup>{price}
                        </span>
                        : ""
                    }
                    <span className='after-discount'>
                        <sup><i className='bi bi-currency-dollar'></i></sup>
                        {price - (price * discount / 100)}<sub>{discount ? "("+discount+"%)": ""}</sub>
                    </span>
                </div>
            </div>
            <div className="card-button" >
                <i className="bi bi-cart4" onClick={(e) => (addToBasket(e))}></i>
                <i className="bi bi-heart" onClick={(e) => (addToBasket(e))}></i>
                <i className="bi bi-share-fill" onClick={(e) => (addToBasket(e))}></i>
            </div>
        </section>
    )
}
export default Product