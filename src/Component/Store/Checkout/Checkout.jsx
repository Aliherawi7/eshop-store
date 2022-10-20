import React from 'react'
import './Checkout.css'
import Button from '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import { actions, getBasketTotal, getBasketTotalItems } from '../../../reducer'

const Checkout = () => {
    const navigate = useNavigate()
    const [{ basket }, dispatch] = useStateValue()

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
        <div className={`checkout checkout-entering`}>
            <div className='basket-header'>
            <h2>My Bag</h2>
            <span className="small-title">Total {getBasketTotalItems(basket)} {getBasketTotalItems(basket) >1? "items": "item"}</span>
            </div>
            <div className="table-container">
                <div className="products-in-basket">
                    {basket.map((item) => {
                        return (
                            <div className={'item-in-basket'} key={item.id}>
                                <div className='image-container'>
                                    <img src={item.image} />
                                </div>
                                <div className='details'>
                                    <h3>{item.name}</h3>
                                    <strong className="small-title">{"$" + item.price * item.quantity}</strong>
                                    <div className='control-quantity'>
                                        <div className='quantity align_center'>
                                            <i className='bi bi-plus' onClick={(e) => increaseQuantity(item.id)}></i>
                                            <input type="text" value={item.quantity} className="quantity-input" />
                                            <i className={'bi bi-' + (item.quantity > 1 ? 'dash-lg' : 'trash color-red')}
                                                onClick={() => decreaseQuantity(item.id)}></i>
                                        </div>
                                    </div>

                                </div>
                            </div>)
                    })}
                </div>
                {/* <Button btnType="success" click={() => (navigate('/store'))} >
                    Update Cart <i className="bi bi-cart4"></i>
                </Button> */}
            </div>
            <div className="cart-table-container">
                <div className="cart-total" >
                    <span className="small-title">Total</span>
                    <span><strong>{'$' + getBasketTotal(basket)}</strong></span>
                </div>
                <Button btnType="success" click={() => (alert("done"))}>Next</Button>
            </div>

        </div>
    )
}
export default Checkout