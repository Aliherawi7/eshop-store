import React from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../StateProvider'
import { actions } from '../../../reducer';
import { getBasketTotal } from "../../../reducer"
import "./BasketPreview.css"

function BasketPreview() {
    const [{ basket }, dispatch] = useStateValue();
    const increaseQuantity = (id) => {
        const index = basket.findIndex(item => {
            return item.id == id;
        })
        const quantity = basket[index].quantity
        dispatch({
            type: actions.CHANGE_QUANTITY,
            item: {
                id: id,
                index: index,
                quantity: quantity + 1
            }
        })
    }

    const decreaseQuantity = (id) => {
        const index = basket.findIndex(item => {
            return item.id == id;
        })
        const quantity = basket[index].quantity
        if (quantity == 1) {
            dispatch({
                type: actions.REMOVE_FROM_BASKET,
                item: {
                    id: id,
                    index: index
                }
            })
            return;
        }
        dispatch({
            type: actions.CHANGE_QUANTITY,
            item: {
                id: id,
                index: index,
                quantity: quantity - 1
            }
        })
    }
    return (
        <div className='basket-preview'>
            <div className='b-p-header'>
                <span>{basket.length} {basket.length > 0 ? 'Products' : "Product"}</span>
                <Link to={"/checkout"}>See Cart</Link>
            </div>
            <section className='b-p-body'>
                {basket.map((item) => {
                    return (
                        <div className='b-p-product' key={item.id}>
                            <span><img src={item.image} /></span>
                            <div>
                                <span>{item.name}</span><br/>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        </div>)
                })}
            </section>
            <div className='b-p-footer'>
                <div>
                    Payment Total
                    <span>$ {getBasketTotal(basket)}</span>
                </div>
                <Link to="/checkout" className="success">Order</Link>
            </div>
        </div>
    )
}

export default BasketPreview