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
            <h2>Checkout</h2>
            <div className="table-container">
                <div className="product-table">
                    <h1 className="checkout-title">Your shopping Basket</h1>
                    <table className="item-table">
                        <tr>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                        {basket.map((item) => {
                            return (<tr className={'item.deleteAnimation'} key={item.id}>
                                <td><img src={item.image} /></td>
                                <td>{item.name}</td>
                                <td >
                                    <div className='quantity'>
                                        <i className='bi bi-plus' onClick={(e) => increaseQuantity(item.id)}></i>
                                        <input type="text" value={item.quantity} className="quantity-input" />
                                        <i className={'bi bi-' + (item.quantity > 1 ? 'dash-lg' : 'trash color-red')}
                                            onClick={() => decreaseQuantity(item.id)}></i>
                                    </div>
                                </td>
                                <td>{item.price * item.quantity + '$'}</td>
                            </tr>)
                        })}
                    </table>
                    <Button btnType="success" click={() => (navigate('/store'))} >
                        Update Cart <i className="bi bi-cart4"></i>
                    </Button>
                </div>
                <div className="cart-table-container">
                    <table className="cart-table" >
                        <thead><tr><th>Cart Totals</th></tr></thead>
                        <tr>
                            <th>Cart Subtotal</th>
                            <td>{getBasketTotal(basket) + "$"}</td>
                        </tr>
                        <tr>
                            <th>Shiping Total</th>
                            <td>{getBasketTotalItems(basket)}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>{getBasketTotal(basket) + getBasketTotalItems(basket) + '$'}</td>
                        </tr>
                    </table>
                    <Button btnType="success" click={() => (alert("done"))}>Proceed to checkout</Button>
                </div>

            </div>
        </div>
    )
}
export default Checkout