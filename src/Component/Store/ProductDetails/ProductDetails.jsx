import React, { useEffect, useState } from 'react'
import "./ProductDetails.css"
import Button from '../../UI/Button/Button'
import { useParams } from 'react-router-dom'
import Loading from '../../UI/Loading/Loading'
import DetailsPane from './productDetailPane/detailsPane'
import { useStateValue } from '../../../StateProvider'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'
import { BytesToFile } from '../../Utils/BytesToFile'

const ProductDetails = () => {
    const [{ basket }, dispatch] = useStateValue()
    const [product, setProduct] = useState();
    let producstElement;
    const [people, peopleSetState] = useState([
        { name: 'Ali', avatar: '/image/people/1.jpg', reviewText: "this is a sample test", date: "Today, 11:10 am" },
        { name: 'Maria', avatar: '/image/people/2.jpg', reviewText: "this is a sample test", date: "Today, 11:10 am" }
    ])
    const { id } = useParams()
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/products/' + id).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                data.image = BytesToFile(data.image, { contentType: "image/png" });
                setProduct(data);
            })
        }
        getData();

    }, [])

    const addToBasket = () => {
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
                name: product.name,
                image: product.image,
                price: product.price,
                rating: product.rating,
                id: id,
                quantity: 1
            }
        })
    }

    //if data have been loaded from server
    if (product) {
        producstElement = (
            <div className={`product-entering`}>
                <div className="product-details">
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>
                        <RateStar rate={product.rate} size={"large"} />
                        <h4 className="product-price">price: ${product.price}</h4>
                        <p className="product-description">descriptions: descriptions about the product</p>
                        <Button btnType="outline" click={addToBasket}>
                            Add <i className="bi bi-cart4"></i>
                        </Button>
                    </div>
                </div>
                <DetailsPane people={people} dataSheet={product} description={product.description} />
            </div>
        )
    } else {
        //if data have not been loaded from server
        producstElement = (
            <Loading />
        )
    }
    return producstElement

}

export default ProductDetails