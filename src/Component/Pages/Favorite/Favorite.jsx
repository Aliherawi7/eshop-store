import React, { useState, useEffect } from 'react'
import { BytesToFile } from '../../../Utils/BytesToFile';
import RateStar from '../../Store/Rate-Star/RateStar';
import { useNavigate } from 'react-router-dom';
import './Favorite.css'
import { toast } from 'react-toastify';


function Favorite() {
    const [product, setproduct] = useState([]);
    const navigate = useNavigate();

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
                }
            }).then(data => {
                console.log(data)
                if (data)
                    setproduct(data);
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
        setproduct(newList)
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
                                <img src={BytesToFile(item.images[0], "image/png")} alt="slider" />
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
                                    <i className="bi bi-cart4" onClick={(e) => ((e))}></i>
                                    <i className="bi bi-trash" onClick={(e) => removeFavorite(item.productId, e)}></i>
                                </div>
                            </section>
                        )
                    }): <h2>No Product found</h2>
                }
            </div>
        </div>
    )
}

export default Favorite