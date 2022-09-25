import React, { useState } from 'react'
import "./ProductDetails.css"
import Button from '../../UI/Button/Button'
import { useParams } from 'react-router-dom'
import Loading from '../../UI/Loading/Loading'
import DetailsPane from './productDetailPane/detailsPane'
import { useStateValue } from '../../../StateProvider'
import Products from '../../../products'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'

const ProductDetails = () => {
    const [{basket}, dispatch] = useStateValue()
    const [people, peopleSetState] = useState([
        { name: 'Ali', avatar: '/image/people/1.jpg', reviewText: "this is a sample test", date: "Today, 11:10 am" },
        { name: 'Maria', avatar: '/image/people/2.jpg', reviewText: "this is a sample test", date: "Today, 11:10 am" }
    ])
    const { id } = useParams()

    const foundProduct = Products.find((item) => {
        return item.id === id
    })

    const addToBasket = () => {
        const index = basket.findIndex(item =>{
            return item.id == id;
        })
        
        if(index >=0){
            dispatch({
                type: actions.CHANGE_QUANTITY,
                item:{
                    id:id,
                    index:index,
                    quantity: basket[index].quantity + 1
                }
            })
            return;
        }
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: foundProduct.name,
                image: foundProduct.image,
                price: foundProduct.price,
                rating: foundProduct.rating,
                id: id,
                quantity:1
            }
        })
    }

    let productDetails;

    //if data have been loaded from server
    if (foundProduct) {
        productDetails = (
            <div className={`product-entering`}>
                <div className="product-details">
                    <img src={foundProduct.image} alt={foundProduct.name} />
                    <div className="product-info">
                        <h3 className="product-title">{foundProduct.name}</h3>
                        <RateStar rate={foundProduct.rate} size={"large"} type={'Customer reviews'} />
                        <h4 className="product-price">price: ${foundProduct.price}</h4>
                        <p className="product-description">descriptions: descriptions about the product</p>
                        <Button btnType="outline" click={addToBasket}>
                            Add <i className="bi bi-cart4"></i>
                        </Button>
                    </div>
                </div>
                <DetailsPane people={people} dataSheet={foundProduct} description={foundProduct.description} />
            </div>
        )
    }else {
    //if data have not been loaded from server
    productDetails = (
        <Loading />
    )
}
return productDetails
        
}

export default ProductDetails