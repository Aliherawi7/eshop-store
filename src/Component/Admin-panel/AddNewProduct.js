import React, { useState } from "react"
import "./AddNewProduct.css"
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

export function AddNewProduct(props) {
    const [state, setState] = useState({
        image: '',
        name: '',
        category: '',
        color: '',
        brandName: '',
        size: '',
        description: '',
        quantityInDepot: '',
        price: '',
        productionDate: '',
    });
    const [modalStart, setModalStart] = useState(false);
    const inputsName = {
        IMAGE: 'IMAGE',
        NAME: 'NAME',
        CATEGORY: 'CATEGORY',
        COLOR: 'COLOR',
        BRANDNAME: 'BRANDNAME',
        SIZE: 'SIZE',
        DESCRIPTION: 'DESCRIPTION',
        QUANTITY_IN_DEPOT: 'QUANTITY_IN_DEPOT',
        PRICE: 'PRICE',
        PRODUTION_DATE: 'PRODUCTION'

    }
    const inputsHandler = (e, inputName) => {
        const value = e.target.value;
        switch (inputName) {
            case inputsName.IMAGE:
                setState({
                    ...state,
                    image: e.target.files[0]
                })
                break;
            case inputsName.NAME:
                setState({
                    ...state,
                    name: value
                })
                break;
            case inputsName.CATEGORY:
                setState({
                    ...state,
                    category: value
                })
                break;
            case inputsName.COLOR:
                setState({
                    ...state,
                    color: value
                })
                break;
            case inputsName.BRANDNAME:
                setState({
                    ...state,
                    brandName: value
                })
                break;
            case inputsName.SIZE:
                setState({
                    ...state,
                    size: value
                })
                break;
            case inputsName.PRICE:
                setState({
                    ...state,
                    price: value
                })
                break;
            case inputsName.DESCRIPTION:
                setState({
                    ...state,
                    description: value
                })
                break;
            case inputsName.QUANTITY_IN_DEPOT:
                setState({
                    ...state,
                    quantityInDepot: value
                })
                break;
            case inputsName.PRODUTION_DATE:
                setState({
                    ...state,
                    productionDate: value
                })
                break;

            default:
                break;
        }


    }
    const [warningMessage, setWarningMessage] = useState([]);

    const addProductToDB = () => {

        //in here it checks if there is any empty input box
        const inCompletes = [];
        for (let data in state) {
            if (typeof state[data] == 'string') {
                if (state[data].trim() === '') {
                    inCompletes.push(data)
                }
            } else {
                if (data == 'image' && typeof state[data] != 'object') {
                    inCompletes.push(data)
                }
            }
        }

        //check if there is an empty input then show warning message
        if (inCompletes.length > 0) {
            setWarningMessage(inCompletes)
            return;
        } else {
            setWarningMessage([])
        }
        fetch('http://localhost:8080/api/products/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(state)
        }).then(res => {
            if (res.ok) {
                setModalStart(true)
                clearAll();

            }
        }).catch(error => {
            console.log(error)
        })

        setModalStart(false)
    }

    const clearAll = () => {
        setState({
            image: '',
            name: '',
            category: '',
            color: '',
            brandName: '',
            size: '',
            description: '',
            quantityInDepot: '',
            price: '',
            productionDate: '',
        });
        setWarningMessage([])
    }

    return (
        <div className='add-new-product fade-in'>
            <div className="header-box">
                <h2>Add New Product</h2>
                <Button btnType="success save" style={{ "--i": "#32a7e1" }} click={props.back}>
                    Back <i className="bi bi-arrow-return-left"></i>
                </Button>
            </div>
            {modalStart ? <Modal messageType={true} start={modalStart}></Modal> : ""}
            <div className='add-product-form'>
                <form style={{ "--i": "#32a7e1" }}>
                    <div className="input-group">
                        <div className="input-box">
                            <label>product image</label>
                            <input type="file" accept='image/*' placeholder="image" onChange={(e) => inputsHandler(e, inputsName.IMAGE)} />
                        </div>
                        <div className="input-box">
                            <label>Product Name</label>
                            <input type="text" value={state.name} placeholder="product name" onChange={(e) => inputsHandler(e, inputsName.NAME)} />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-box">
                            <label>Categroy</label>
                            <input type="text" value={state.category} placeholder="category" onChange={(e) => inputsHandler(e, inputsName.CATEGORY)} />
                        </div>
                        <div className="input-box">
                            <label>Price</label>
                            <input type="number" value={state.price} placeholder="price" onChange={(e) => inputsHandler(e, inputsName.PRICE)} />
                        </div>

                        <div className="input-box">
                            <label>Product Color</label>
                            <input type="text" value={state.color} placeholder="color" onChange={(e) => inputsHandler(e, inputsName.COLOR)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <label>Brand Name</label>
                            <input type="text" value={state.brandName} placeholder="brand name" onChange={(e) => inputsHandler(e, inputsName.BRANDNAME)} />
                        </div>
                        <div className="input-box">
                            <label>Amount in depot</label>
                            <input type="number" value={state.quantityInDepot} min={0} placeholder="amount in depot" onChange={(e) => inputsHandler(e, inputsName.QUANTITY_IN_DEPOT)} />
                        </div>
                        <div className="input-box">
                            <label>Product Size</label>
                            <input type="text" value={state.size} placeholder="size" onChange={(e) => inputsHandler(e, inputsName.SIZE)} />
                        </div>
                        <div className="input-box">
                            <label>Production date</label>
                            <input type="date" value={state.productionDate} placeholder="Production date" onChange={(e) => inputsHandler(e, inputsName.PRODUTION_DATE)} />
                        </div>
                    </div>
                    <div className="input-box">
                        <label>Descriptions</label>
                        <input type="text" value={state.description} placeholder="descriptions" onChange={(e) => inputsHandler(e, inputsName.DESCRIPTION)} />
                    </div>
                    <div className="input-box incomplete-inputs">
                        <span>{warningMessage.length > 0 ? "Please fill the: " + warningMessage.map(item => ' ' + item) : ""}</span>
                    </div>
                    <div className="button-container" >
                        <Button btnType="success save" style={{ "--i": "#32a7e1" }} click={addProductToDB}>
                            Save Product<i className="bi bi-file-text-fill"></i>
                        </Button>
                        <Button btnType="danger" click={clearAll} style={{ "--i": "#ac0a0a" }}>
                            Clear<i className="bi bi-trash-fill"></i>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewProduct