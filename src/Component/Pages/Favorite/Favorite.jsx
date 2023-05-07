import React, { useState, useEffect } from 'react'
import RateStar from '../../Store/Rate-Star/RateStar';
import { useNavigate } from 'react-router-dom';
import './Favorite.css'
import { toast } from 'react-toastify';
import { useStateValue } from '../../../StateProvider';
import { actions } from '../../../reducer';


function Favorite() {
    const [product, setproduct] = useState([]);
    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue()
    useEffect(() => {
        function getDate() {
            fetch("http://localhost:8080/api/favorites", {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': localStorage.getItem('accessToken')
                },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText)
                }
            }).then(data => {
                if (data)
                    setproduct(data);
            }).catch(error => {
                console.log(error)
            })
        }
        getDate()
    }, [])
    const removeFavorite = (productId, e) => {
        e.stopPropagation();
        fetch("http://localhost:8080/api/favorites/" + productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("accessToken")
            },
        }).then(res => {
            if (res.ok) {
                toast.success("product removed from favorite list", {
                    position: 'bottom-right'
                })
            }
        })
        const productIndex = product.findIndex(item => {
            return item.id == productId
        })
        const newList = [...product]
        newList.splice(productIndex, 1)
        console.log(newList)
        setproduct(newList)
    }

    const addToBasket = (item, e) => {
        e.stopPropagation()
        const index = basket.findIndex(item => {
            return item.id == item.productId;
        })

        // if there are not enough product in depot
        if (index >= 0 && basket[index].quantity >= item.quantityInDepot) { return; }

        if (index >= 0) {
            dispatch({
                type: actions.CHANGE_QUANTITY,
                item: {
                    id: item.productId,
                    index: index,
                    quantity: basket[index].quantity + 1
                }
            })
            return;
        }
        console.log(item)
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: item.name,
                image: item.images[0],
                price: item.price,
                rating: item.rating,
                id: item.productId,
                quantityInDepot: item.quantityInDepot,
                quantity: 1
            }
        })
    }


    return (
        <div className='favorite'>
            <div className='favorite-header'>
                <h2>My Fovorites</h2>
                <span className="small-title">Total {product.length} {product.length > 1 ? "items" : "item"}</span>
            </div>
            <div className='favorites-list'>
                {product.length > 0 ?
                    product.map(item => {
                        return (
                            <section className="card entering-animation" key={item.productId} onClick={() => navigate('/store/productdetails/' + item.productId)}>
                                <span className='discount-logo'></span>
                                <img src={item.images[0]} alt="slider" />
                                <RateStar rate={item.rate} size={'small'} />
                                <div className="product-info">
                                    <h4>{item.name}</h4>
                                    <div className='product-price'>
                                        {item.discount ?
                                            <span className='before-discount'>
                                                <sup><i className='bi bi-currency-dollar'></i></sup>{item.price}
                                            </span>
                                            : ""
                                        }
                                        <span className='after-discount'>
                                            <sup><i className='bi bi-currency-dollar'></i></sup>
                                            {item.price - (item.price * item.discount / 100)}<sub>{item.discount ? "(" + item.discount + "%)" : ""}</sub>
                                        </span>
                                    </div>
                                </div>
                                <div className="card-button" >
                                    <i className="bi bi-cart4" onClick={(e) => addToBasket(item, e)}></i>
                                    <i className="bi bi-trash" onClick={(e) => removeFavorite(item.productId, e)}></i>
                                </div>
                            </section>
                        )
                    }) : <h2>No Product found</h2>
                }
            </div>
        </div>
    )
}

export default Favorite