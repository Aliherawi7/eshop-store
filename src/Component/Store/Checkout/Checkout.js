import React from 'react'
import './Checkout.css'
import { Transition } from 'react-transition-group'
import Button from '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import {getBasketTotal} from '../../../reducer'

const Checkout = () => {
    const navigate = useNavigate()
    const [{ basket }, dispatch] = useStateValue()
    const removeItem = (id) => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id: id
        })
    }

    return (
        <Transition timeout={500} in={true} appear>
            {(status) => (
                <div className={`checkout checkout-${status}`}>
                    <h2>Checkout</h2>
                    <div className="table-container">
                        <div className="product-table">
                            <h1 class="checkout-title">Your shopping Basket</h1>
                            <table className="item-table">
                                <tr>
                                    <th>Item</th>
                                    <th>name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                                {basket.map((item) => {
                                    return (<tr className={'item.deleteAnimation'}>
                                        <td><img src={item.image} /></td>
                                        <td>{item.name}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price + '$'}</td>
                                        <td><Button btnType="bi bi-x remove-item danger" click={() => (removeItem(item.id))}></Button></td>
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
                                    <td>{getBasketTotal(basket)+"$"}</td>
                                </tr>
                                <tr>
                                    <th>Shiping Total</th>
                                    <td>{basket.length}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>{getBasketTotal(basket)+basket.length+'$'}</td>
                                </tr>
                            </table>
                            <Button btnType="success" click={() => (alert("done"))}>Proceed to checkout</Button>
                        </div>

                    </div>
                </div>
            )}
        </Transition>
    )
}
export default Checkout