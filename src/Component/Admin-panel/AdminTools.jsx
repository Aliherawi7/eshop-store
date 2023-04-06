import React, { useState, useEffect } from 'react'
import "./AdminTools.css"
import Button from "../UI/Button/Button"
import CustomeProduct from './CustomeProduct'
import AddNewCategory from './AddNewCategory'
import OrderBarChart from './OrderBarChart'
import { toast } from 'react-toastify'
import { useStateValue } from '../../StateProvider'
import { actions } from '../../reducer'
import Modal from '../UI/modal/Modal'
import ProductLineChart from './ProductLineChart'
import ApiUrls from '../../Constants/ApiUrls'


export function Dashboard() {
    const [state, dispatch] = useStateValue();
    const [modelSummary, setmodelSummary] = useState({})
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: true
        })
        async function getSummary() {
            await fetch('http://localhost:8080/api/statistics/models', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken")
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.status);
                }
            }).then(data => {
                setmodelSummary(data)
            })
        }
        getSummary();
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
                    <p className='statistics'>{modelSummary?.products}</p>
                    <span className='precent-statistics'>Increased 35%</span>
                </div>

                <div className='model-statistics' style={{ "--i": "#26ad80" }}>
                    <i className='bi bi-basket-fill'></i>
                    <h4>Orders</h4>
                    <p className='statistics'>{modelSummary?.orders}</p>
                    <span className='precent-statistics'>Increased 50%</span>
                </div>
                <div className='model-statistics' style={{ "--i": "#b44ac6" }}>
                    <i className='bi bi-boxes'></i>
                    <h4>Categories</h4>
                    <p className='statistics'>{modelSummary?.categories}</p>
                    <span className='precent-statistics'>Increased 40%</span>
                </div>
                <div className='model-statistics' style={{ "--i": "#fe8907" }}>
                    <i className='bi bi-people-fill'></i>
                    <h4>Users</h4>
                    <p className='statistics'>{modelSummary?.users}</p>
                    <span className='precent-statistics'>Increased 45%</span>
                </div>

            </div>
            <section className='chart-container'>
                <OrderBarChart />
                <ProductLineChart />
            </section>

        </div>
    )
}

export function ProductsPanel() {
    const [state, setState] = useState(true);
    const [, dispatch] = useStateValue();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState({ show: false, productId: -1 })
    let [productDetail, setProductDetail] = useState({});
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: true
        })
        const getData = async () => {
            let response = await fetch(ApiUrls.hostName + ApiUrls.products.allProducts(0, 15));

            if (response.ok) {
                let data = await response.json();
                setProducts(data)

            } else {

            }
            dispatch({
                type: actions.LOADING,
                item: false
            })
        }
        getData();

    }, [])

    const deleteProduct = (id) => {

        fetch("http://localhost:8080/api/products/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem("accessToken")
            },
        }).then(res => {
            if (!res.ok)
                throw new Error(res.statusText)
        }).then(data => {
            const productIndex = products.findIndex(item => {
                return item.id == id;
            })
            const newProductList = [...products];
            newProductList.splice(productIndex, 1)
            toast.success("product successfully deleted.", {
                position: "bottom-right",
                closeOnClick: true,
                autoClose: true,
                closeButton: true
            })
            setProducts(newProductList)
        }).catch(error => {
            console.log(error)
            toast.error("couldn't removed the product.", {
                position: "bottom-right",
                closeOnClick: true,
                autoClose: true,
                closeButton: true,
                responsive: true
            })
        })
        setShowModal(false)
    }

    const addProduct = () => {
        setProductDetail({});
        setState(false);
    }

    const editProduct = (item) => {
        console.log(item)
        setProductDetail(item);
        setState(false);
    }
    console.log(productDetail)
    return (state ?
        <div className='products-statistics panel-statistics fade-in'>
            <div className='products-table model-table' style={{ "--i": "#32a7e1" }}>
                <div className='section-header'>
                    <div>
                        <h2>Products</h2>
                        <p>{products.length} products</p>
                    </div>
                    <Button btnType="white" click={addProduct}>
                        add
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <Modal show={showModal.show} ModalClose={() => setShowModal({ ...showModal, show: false })}>
                    <h2>Are you sure?</h2>
                    <Button btnType="danger" click={() => deleteProduct(showModal.productId)}>Yes</Button>
                    <Button btnType="success" click={() => setShowModal(!showModal)}>No</Button>
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <th name='id'>ID</th>
                            <th name="name">NAME</th>
                            <th>CATEGORIES</th>
                            <th>BRAND NAME</th>
                            <th>PRICE</th>
                            <th>INVENTORY</th>
                            <th >STATE</th>
                            <th name='last'>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map(product => {
                            return (
                                <tr key={product.productId}>
                                    <td name='id'>{product.id}</td>
                                    <td name='name'><img src={product.images[0]} />{product.name?.toUpperCase()}</td>
                                    <td >{product.category?.toUpperCase()}</td>
                                    <td >{product.brandName?.toUpperCase()}</td>
                                    <td name="price">${product.price}</td>
                                    <td>{product.quantityInDepot}</td>
                                    <td>{product.quantityInDepot > 0 ? "available" : 'not available'}</td>
                                    <td name='last'>
                                        <span className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <span className='buttons-box'>
                                                <i className='bi bi-trash' onClick={() => setShowModal({ show: true, productId: product.productId })} style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' onClick={() => editProduct(product)}></i>
                                            </span>
                                        </span>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>

                </table>
            </div>

        </div>
        : <CustomeProduct
            back={() => setState(true)}
            id={productDetail?.id}
            data={productDetail}
        />
    )
}


export function CategoriesPanel() {
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState(true);
    const [, dispatch] = useStateValue();
    useEffect(() => {
        // dispatch({
        //     type: actions.LOADING,
        //     item: true
        // })
        dispatch({
            type: actions.LOADING,
            item: false
        })

    }, [])

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
                            <tr>
                                <th name='id'>ID</th>
                                <th>NAME</th>
                                <th>TOTAL PRODUCTS</th>
                                <th >STATE</th>
                                <th name='last'>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(product => {
                                return (
                                    <tr key={product.productId}>
                                        <td name='id'>{product?.id}</td>
                                        <td>{product?.name.toUpperCase()}</td>
                                        <td>{product?.amount}</td>
                                        <td>{product?.amount > 0 ? "available" : 'not available'}</td>
                                        <td name='last'>
                                            <span className='action-buttons'>
                                                <i className='bi bi-three-dots-vertical show-actions'></i>
                                                <span className='buttons-box'>
                                                    <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                    <i className='bi bi-pencil' ></i>
                                                </span>
                                            </span>
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
        dispatch({
            type: actions.LOADING,
            item: true
        })
        let ordersList = []
        const getData = async () => {
            let response = await fetch('http://localhost:8080/api/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("accessToken")
                }
            });

            if (response.ok) {
                let data = await response.json();
                ordersList = data
                setOrders(ordersList)

            } else {

            }
            dispatch({
                type: actions.LOADING,
                item: false
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
                        <tr>
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
                        </tr>
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
                                    <td>${order?.amount}</td>
                                    <td>{order.shippingAddress}</td>
                                    <td>{order?.amount > 0 ? "paid" : 'unpaid'}</td>
                                    <td>{order?.amount > 110 ? "4" : '5'}</td>
                                    <td name='last'>
                                        <span className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <span className='buttons-box'>
                                                <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' ></i>
                                            </span>
                                        </span>
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
    const [, dispatch] = useStateValue();
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: true
        })
        const getData = () => {
            fetch('http://localhost:8080/api/users', {
                headers: {
                    'Authorization': localStorage.getItem("accessToken")
                }
            }).then(res => {
                dispatch({
                    type: actions.LOADING,
                    item: false
                })
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error()
                }
            }).then(data => {
                setUsers(data)
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
                        <tr>
                            <th name='id'>ID</th>
                            <th >USER NAME</th>
                            <th>EMAIL</th>
                            <th>TOTAL ORDERS</th>
                            <th>TOTAL SPEDING</th>
                            <th>LOCATION</th>
                            <th>ROLES</th>
                            <th >Status</th>
                            <th name='last'>ACTIONS</th>
                        </tr>
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
                                        <span className='action-buttons'>
                                            <i className='bi bi-three-dots-vertical show-actions'></i>
                                            <span className='buttons-box'>
                                                <i className='bi bi-trash' style={{ "--i": 'red' }}></i>
                                                <i className='bi bi-pencil' ></i>
                                            </span>
                                        </span>
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
