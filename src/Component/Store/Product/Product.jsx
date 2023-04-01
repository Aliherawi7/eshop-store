import React from 'react'
import "./product.css"
import { useStateValue } from '../../../StateProvider'
import { useNavigate } from 'react-router-dom'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'
import { toast } from 'react-toastify'

const Product = ({ image, id, name, price, rating, quantityInDepot, discount, customeRef }) => {
    const navigate = useNavigate()
    const [{ basket }, dispatch] = useStateValue()
    const addToBasket = (e) => {
        e.stopPropagation()
        const index = basket.findIndex(item => {
            return item.id == id;
        })

        // if there are not enough product in depot
        if (index >= 0 && basket[index].quantity >= quantityInDepot) { return; }

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
        console.log(image)
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: name,
                image: image,
                price: price,
                rating: rating,
                id: id,
                quantityInDepot: quantityInDepot,
                quantity: 1
            }
        })
    }

    const addToFavorite = (productId, e) => {
        e.stopPropagation();
        fetch("http://localhost:8080/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ productId: productId })
        }).then(res => {
            if (res.ok) {
                toast.success("successfully added", {
                    position: 'bottom-right'
                });
            }
        })
    }

    return (
        <section className="card entering-animation" onClick={() => navigate('/store/productdetails/' + id)} ref={customeRef}>
            {discount > 0 ? <span className='discount-value'>{discount ? discount + "% " : ""}</span> : ""}
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
                        {price - (price * discount / 100)}
                    </span>
                </div>
            </div>
            <div className="card-button">
                <i className="bi bi-cart4" onClick={(e) => (addToBasket(e))}></i>
                <i className="bi bi-heart" onClick={(e) => (addToFavorite(id, e))}></i>
                <i className="bi bi-share-fill" onClick={(e) => (addToBasket(e))}></i>
            </div>
        </section>
    )
}
export default Product