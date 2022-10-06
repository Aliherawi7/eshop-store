import React, { useState, useEffect } from 'react'
import "./AdminTools.css"
import Products from '../../products'
import Button from "../UI/Button/Button"
import AddNewProduct from './AddNewProduct'
import AddNewCategory from './AddNewCategory'
import BarChart from './BarChart'
import { toast } from 'react-toastify'
import { useStateValue } from '../../StateProvider'
import { actions } from '../../reducer'
import { BytesToFile } from '../Utils/BytesToFile'

export function Dashboard() {
    const [state, dispatch] = useStateValue();
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: false
        })

    }, [])

    return (
        <div className='dashboard fade-in'>
            <div className='models-statistics ' >
                <div className='model-statistics' style={{ "--i": "#6969d9" }}>
                    <i className='bi bi-box'></i>
                    <h4>Products</h4>
                    <p className='statistics'>765</p>
                    <span className='precent-statistics'>Increased 35%</span>
                </div>

                <div className='model-statistics' style={{ "--i": "#26ad80" }}>
                    <i className='bi bi-basket-fill'></i>
                    <h4>Orders</h4>
                    <p className='statistics'>1076</p>
                    <span className='precent-statistics'>Increased 50%</span>
                </div>
                <div className='model-statistics' style={{ "--i": "#b44ac6" }}>
                    <i className='bi bi-boxes'></i>
                    <h4>Categories</h4>
                    <p className='statistics'>15</p>
                    <span className='precent-statistics'>Increased 40%</span>
                </div>
                <div className='model-statistics' style={{ "--i": "#fe8907" }}>
                    <i className='bi bi-people-fill'></i>
                    <h4>Users</h4>
                    <p className='statistics'>765</p>
                    <span className='precent-statistics'>Increased 45%</span>
                </div>

            </div>
            <BarChart />

        </div>
    )
}

export function ProductsPanel() {
    const [state, setState] = useState(true);
    const [, dispatch] = useStateValue();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: true
        })
        const getData = () => {
            fetch('http://localhost:8080/api/products').then(res => {
                dispatch({
                    type: actions.LOADING
                })
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                data = data.map(item =>{
                    item.image = BytesToFile(item.image, "image/png");
                    return item;
                })
                console.log(data)
                setProducts(data)
            }).catch(error => {
                dispatch({
                    type: actions.LOADING,
                    item: false
                })
                console.log(error)
            })
        }

        getData();


    }, [])

    const deleteProduct = (id) => {
        fetch("http://localhost:8080/api/products/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("accessToken")
            },

        }).then(res => {
            if (res.ok) {
                console.log("deleted")
                toast.done("product successfully deleted.", {
                    position: "bottom-right",
                    closeOnClick: true,
                    autoClose: true,
                    closeButton: true
                })
            } else {
                toast.error("couldn't removed the product.", {
                    position: "bottom-right",
                    closeOnClick: true,
                    autoClose: true,
                    closeButton: true,
                    responsive: true
                })
            }
        })
    }

    return (state ?
        <div className='products-statistics panel-statistics fade-in'>
            <div className='products-table model-table' style={{ "--i": "#32a7e1" }}>
                <div className='section-header'>
                    <div>
                        <h2>Products</h2>
                        <p>{Products.length} products</p>
                    </div>
                    <Button btnType="white" click={() => setState(false)}>
                        add
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <table>
                    <thead>
                        <th name='id'>ID</th>
                        <th name="name">NAME</th>
                        <th>CATEGORIES</th>
                        <th>BRAND NAME</th>
                        <th>PRICE</th>
                        <th>INVENTORY</th>
                        <th >STATE</th>
                        <th name='last'>ACTIONS</th>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td name='id'>{product.id}</td>
                                    <td name='name'><img src={product.image} />{product.name?.toUpperCase()}</td>
                                    <td >{product.category?.toUpperCase()}</td>
                                    <td >{product.brandName?.toUpperCase()}</td>
                                    <td name="price">${product.price}</td>
                                    <td>{product.quantityInDepot}</td>
                                    <td>{product.quantityInDepot > 0 ? "available" : 'not available'}</td>
                                    <td name='last'>
                                        <div className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <div className='buttons-box'>
                                                <i className='bi bi-trash' onClick={() => deleteProduct(product.id)} style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' ></i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
        : <AddNewProduct back={() => setState(true)} />
    )
}


export function CategoriesPanel() {
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState(true);
    return (
        state ?
            <div className='categories-statistics panel-statistics fade-in'>
                <div className='categories-table model-table' style={{ "--i": "#b44ac6" }}>
                    <div className='section-header'>
                        <div>
                            <h2>Categories</h2>
                            <p>{categories.length} categories</p>
                        </div>
                        <Button btnType="white" click={() => setState(false)}>
                            add
                            <i className='bi bi-plus-lg'></i>
                        </Button>
                    </div>
                    <table>
                        <thead>
                            <th name='id'>ID</th>
                            <th>NAME</th>
                            <th>TOTAL PRODUCTS</th>
                            <th >STATE</th>
                            <th name='last'>ACTIONS</th>
                        </thead>
                        <tbody>
                            {categories.map(product => {
                                return (
                                    <tr>
                                        <td name='id'>{product?.id}</td>
                                        <td>{product?.name.toUpperCase()}</td>
                                        <td>{product?.amount}</td>
                                        <td>{product?.amount > 0 ? "available" : 'not available'}</td>
                                        <td name='last'>
                                            <div className='action-buttons'>
                                                <i className='bi bi-three-dots-vertical show-actions'></i>
                                                <div className='buttons-box'>
                                                    <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                    <i className='bi bi-pencil' ></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            : <AddNewCategory back={() => setState(true)} />
    )
}

export function OrdersPanel() {
    const [state, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        let ordersList = []
        dispatch({
            type: actions.LOADING,
            item: true
        })
        const getData = () => {
            fetch('http://localhost:8080/api/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("accessToken")
                }
            }).then(res => {
                dispatch({
                    type: actions.LOADING,
                    item: false
                })
                console.log(res)
                if (res.status === 200) {
                    return res.json();
                    console.log(res.json())
                } else if (res.status == 204) {
                    console.log('no cont')

                }

            }).then(data => {
                console.log(data)
                ordersList = data
                setOrders(ordersList)

            }).catch(error => {
                console.log(error)
                dispatch({
                    type: actions.LOADING,
                    item: false
                })
            })
        }
        getData();
    }, [])

    return (
        <div className='orders-statistics panel-statistics fade-in'>
            <div className='orders-table model-table' style={{ "--i": "#26ad80" }}>
                <div className='section-header'>
                    <div>
                        <h2>Recent Orders</h2>
                        <p>{orders.length} orders</p>
                    </div>
                    <Button btnType="white">
                        add
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <table>
                    <thead>
                        <th name='id'>ID</th>
                        <th >Customer</th>
                        <th>Product</th>
                        <th>CATEGORIES</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Location</th>
                        <th >Status</th>
                        <th >rate</th>
                        <th name='last'>ACTIONS</th>

                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order.id}>
                                    <td name='id'>{order.id}</td>
                                    <td>{'ali herawi'}</td>
                                    <td>{order.productId}</td>
                                    <td >{order.brand?.toUpperCase()}</td>
                                    <td >{order.quantity}</td>
                                    <td>${order?.amount * order.quantity}</td>
                                    <td>{order.shippingAddress}</td>
                                    <td>{order?.amount > 0 ? "paid" : 'unpaid'}</td>
                                    <td>{order?.amount > 110 ? "4" : '5'}</td>
                                    <td name='last'>
                                        <div className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <div className='buttons-box'>
                                                <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' ></i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function UsersPanel() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:8080/api/users', {
                headers: {
                    'Authorization': localStorage.getItem("accessToken")
                }
            }).then(res => {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error()
                }
            }).then(data => {
                console.log(data)
                setUsers(data)
                console.log(users)
            })
        }
        getData();

    }, [])


    return (
        <div className='orders-statistics panel-statistics  fade-in'>
            <div className='orders-table model-table' style={{ "--i": "#26ad80" }}>
                <div className='section-header'>
                    <div>
                        <h2>Recent Users</h2>
                        <p>{users.length} Users</p>
                    </div>
                    <Button btnType="white">
                        add
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <table>
                    <thead>
                        <th name='id'>ID</th>
                        <th >USER NAME</th>
                        <th>EMAIL</th>
                        <th>TOTAL ORDERS</th>
                        <th>TOTAL SPEDING</th>
                        <th>LOCATION</th>
                        <th>ROLES</th>
                        <th >Status</th>
                        <th name='last'>ACTIONS</th>

                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td name='id'>{user?.id}</td>
                                    <td>{user?.name.toUpperCase() + ' ' + user?.lastName.toUpperCase()}</td>
                                    <td >{user.email}</td>
                                    <td >{user?.totalOrders}</td>
                                    <td>${user?.totalSpending}</td>
                                    <td>{user?.location}</td>
                                    <td>[ {user.roles.map(role => role + ", ")}]</td>
                                    <td>{user.active ? "active" : "deactive"}</td>
                                    <td name='last'>
                                        <div className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <div className='buttons-box'>
                                                <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' ></i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



const admintTools = [Dashboard, ProductsPanel, CategoriesPanel, OrdersPanel, UsersPanel]

export default admintTools;
