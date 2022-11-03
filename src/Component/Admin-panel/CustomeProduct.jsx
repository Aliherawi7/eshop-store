import React, { useState } from "react"
import "./AddNewProduct.css"
import Button from "../UI/Button/Button";
import { toast } from "react-toastify";
import { actions } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { BytesToFile, getBlobOfFile } from "../Utils/BytesToFile";

export function CustomeProduct({ id = '', image = '', name = '', category = '', color = '',
    brandName = '', size = '', description = '', quantityInDepot = '',
    price = '', productionDate = '', discount = 0, back }
) {
    const [, dispatch] = useStateValue();
    const [state, setState] = useState({
        image: image ? getBlobOfFile(image, "image/png") : "",
        name,
        category,
        color,
        brandName,
        size,
        description,
        quantityInDepot,
        price,
        productionDate,
        discount
    });
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
        PRODUTION_DATE: 'PRODUCTION',
        DISCOUNT: "DISCOUNT"
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
            case inputsName.DISCOUNT:
                setState({
                    ...state,
                    discount: value
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
            //return;
        } else {
            setWarningMessage([])
        }
        dispatch({
            type: actions.LOADING,
            item: true
        })
        const formData = new FormData();
        for (let item in state) {
            formData.append(item + "", state[item])
        }
        let httpMethod = 'POST';
        let restApi = 'save'
        if (id != '') {
            formData.append("id", id)
            httpMethod = 'PUT'
            restApi = id
        }
        console.log(state)
        fetch('http://localhost:8080/api/products/' + restApi, {
            method: httpMethod,
            headers: {
                // "Content-Type": "application/json",
                'Authorization': localStorage.getItem('accessToken')
            },
            body: formData
        }).then(res => {
            dispatch({
                type: actions.LOADING,
                item: false
            })
            if (res.ok) {
                //clearAll();
                toast.success("product successfully saved.", {
                    position: "bottom-center"
                })
            } else {
                toast.error("Oops. something went wrong", {
                    position: "bottom-center"
                })
                throw new Error(res.status);
            }
        }).catch(error => console.log(error))

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
                <h2>{"Add New Product"}</h2>
                <Button btnType="success save" style={{ "--i": "#32a7e1" }} click={back}>
                    Back <i className="bi bi-arrow-return-left"></i>
                </Button>
            </div>
            <div className='add-product-form'>
                <form style={{ "--i": "#32a7e1" }}>
                    <div className="input-group upload">
                        <div className="input-box">
                            <label>product image</label>
                            <img
                                src={state.image ? URL.createObjectURL(state.image) : "/image/slide-17.jpg"}
                            />
                            <input type="file" accept='image/*' placeholder="image" onChange={(e) => inputsHandler(e, inputsName.IMAGE)} />
                            <i className="bi bi-cloud-upload"></i>
                        </div>

                    </div>
                    <div className="input-group">
                        <div className="input-box">
                            <label>Product Name</label>
                            <input type="text" value={state.name} placeholder="product name" onChange={(e) => inputsHandler(e, inputsName.NAME)} />
                        </div>
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
                            <input type="color" value={state.color} placeholder="color" onChange={(e) => inputsHandler(e, inputsName.COLOR)} />
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
                    <div className="input-group">
                        <div className="input-box">
                            <label>Discount</label>
                            <input type="number" value={state.discount} placeholder="discount" onChange={(e) => inputsHandler(e, inputsName.DISCOUNT)} />
                        </div>
                        <div className="input-box">
                            <label>Descriptions</label>
                            <input type="text" value={state.description} placeholder="descriptions" onChange={(e) => inputsHandler(e, inputsName.DESCRIPTION)} />
                        </div>
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

export default CustomeProduct