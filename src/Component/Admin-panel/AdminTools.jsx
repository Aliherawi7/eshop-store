import React, { useState, useEffect, useRef } from 'react'
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
import useFetch from '../../Hook/useFetch'
import Spinner from '../UI/Loading/Spinner'


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
    const [pagination, setPagination] = useState({ offset: 0, pageSize: 15 });
    const [InfiniteScrollLoading, setInfiniteScrollLoading] = useState(true);
    const [endOfPage, setEndOfPage] = useState(false)
    const { data, error, loading, setData, hasMore } = useFetch(ApiUrls.hostName + ApiUrls.products.allProducts(pagination.offset, pagination.pageSize));
    const [state, setState] = useState(true);
    const [, dispatch] = useStateValue();
    const [showModal, setShowModal] = useState({ show: false, productId: -1 })
    let [productDetail, setProductDetail] = useState({});
    const lastNode = useRef();
    useEffect(() => {
        dispatch({
            type: actions.LOADING,
            item: true
        })

    }, [])


    const lastNodeReference = node => {
        if (loading) return;
        if (lastNode.current) lastNode.current.disconnect();

        lastNode.current = new IntersectionObserver(enteries => {
            if (enteries[0].isIntersecting) {
                console.log("visible")
                console.log(pagination, hasMore)
                if (hasMore) {
                    setPagination({ offset: pagination.offset + 1, pageSize: pagination.pageSize })
                } else {
                    setEndOfPage(true)
                    setInfiniteScrollLoading(false)
                }
            }
        })
        if (node) lastNode.current.observe(node);
    }

    const deleteProduct = (id) => {
        console.log(id)
        fetch(ApiUrls.hostName + ApiUrls.products.deleteProduct + id, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem("accessToken")
            },
        }).then(res => {
            if (res.ok) {
                toast.success("product successfully deleted.", {
                    position: "bottom-right",
                    closeOnClick: true,
                    autoClose: true,
                    closeButton: true
                })
                return
            } else {
                throw new Error(res.statusText)
            }
        }).then(resData => {
            const productIndex = data?.findIndex(item => {
                console.log(item.productId)
                return item.productId == id;
            })
            const newProductList = [...data];
            newProductList.splice(productIndex, 1)
            setData(newProductList)

        }).catch(error => {
            console.log(error)
            toast.error("couldn't remove the product.", {
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
                        <p>{data?.length} products</p>
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
                        {data?.map((product, index) => {
                            if (data.length === index + 1) {
                                return (
                                    <tr key={product.productId} ref={lastNodeReference}>
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
                            }
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
                {InfiniteScrollLoading && <Spinner />}
                {endOfPage && <h5 style={{ textAlign: "center" }}>you have seen all the products</h5>}
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
