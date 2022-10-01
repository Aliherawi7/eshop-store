import React, { useState, useEffect } from 'react'
import "./AdminTools.css"
import Products from '../../products'
import Button from "../UI/Button/Button"
import AddNewProduct from './AddNewProduct'
import AddNewCategory from './AddNewCategory'
import BarChart from './BarChart'
import Modal from '../UI/Modal/Modal'

export function Dashboard() {

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
    const [modalState, setModalState] = useState();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/products').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            setProducts(data)
        })

        return () => {

        }
    }, [])

    const deleteProduct = (id)=> {
        setModalState({messageType:false, start:false})
        fetch("http://localhost:8080/api/products/delete/"+id,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authentication': localStorage.getItem("access_token")
            },

        }).then(res =>{
            if(res.ok){
                console.log("deleted")
            }else{
                setModalState({messageType:false, start:true})
            }
        })
    }

    return (state ?
        <div className='products-statistics panel-statistics fade-in'>
            <div className='products-table model-table' style={{ "--i": "#32a7e1" }}>
                <Modal start={modalState?.start} messageType={modalState?.messageType} ></Modal>
                <div className='section-header'>
                    <div>
                        <h2>Products</h2>
                        <p>{Products.length} products</p>
                    </div>
                    <Button btnType="white" click={() => setState(false)}>
                        add products
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <table>
                    <thead>
                        <th name='id'>ID</th>
                        <th>NAME</th>
                        <th>CATEGORIES</th>
                        <th>BRAND NAME</th>
                        <th>PRICE</th>
                        <th>AMOUNT</th>
                        <th >STATE</th>
                        <th name='last'>ACTIONS</th>
                    </thead>
                    <tbody>
                        {Products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td name='id'>{product.id}</td>
                                    <td >{product.name.toUpperCase()}</td>
                                    <td >{product.category?.toUpperCase()}</td>
                                    <td >{product.brand.toUpperCase()}</td>
                                    <td name="price">${product.price}</td>
                                    <td>{product.amount}</td>
                                    <td>{product.amount > 0 ? "available" : 'not available'}</td>
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
                            <p>{Products.length} categories</p>
                        </div>
                        <Button btnType="white" click={() => setState(false)}>
                            add Category
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
    return (
        <div className='orders-statistics panel-statistics fade-in'>
            <div className='orders-table model-table' style={{ "--i": "#26ad80" }}>
                <div className='section-header'>
                    <div>
                        <h2>Recent Orders</h2>
                        <p>{Products.length} orders</p>
                    </div>
                    <Button btnType="white">
                        add order
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
                        {Products.map(product => {
                            return (
                                <tr>
                                    <td name='id'>{product.id}</td>
                                    <td>{'ali herawi'}</td>
                                    <td>{product.name.toUpperCase()}</td>
                                    <td >{product.brand.toUpperCase()}</td>
                                    <td >{product.amount}</td>
                                    <td>${product.amount * product.price}</td>
                                    <td>{'Afghanistan'}</td>
                                    <td>{product.amount > 0 ? "paid" : 'unpaid'}</td>
                                    <td>{product.amount > 110 ? "4" : '5'}</td>
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
    return (
        <div className='orders-statistics panel-statistics  fade-in'>Users</div>
    )
}



const admintTools = [Dashboard, ProductsPanel, CategoriesPanel, OrdersPanel, UsersPanel]

export default admintTools;
