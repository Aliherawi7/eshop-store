import React, { useState, useEffect } from "react"
import "./AddNewProduct.css"
import Button from "../UI/Button/Button";
import { toast } from "react-toastify";
import { actions } from "../../reducer";
import { useStateValue } from "../../StateProvider";

let initialState = {
    productId: '',
    imageSide1: '',
    imageSide2: '',
    imageSide3: '',
    name: '',
    category: '',
    color: '',
    brandName: '',
    size: '',
    descriptions: '',
    quantityInDepot: '',
    price: '',
    discount: '',
}
const inputsName = {
    IMAGE_SIDE_1: { id: "imageSide1", name: 'image side-1', type: "file", warning: "" },
    IMAGE_SIDE_2: { id: "imageSide2", name: 'image side-2', type: "file", warning: "" },
    IMAGE_SIDE_3: { id: "imageSide3", name: 'image side-3', type: "file", warning: "" },
    NAME: { id: "name", name: 'name', type: "text" },
    CATEGORY: { id: "category", name: 'category', type: "text", warning: "" },
    COLOR: { id: "color", name: 'color', type: "text" },
    BRANDNAME: { id: "brandName", name: 'brand name', type: "text", warning: "" },
    SIZE: { id: "size", name: 'size', type: "text", warning: "" },
    DESCRIPTION: { id: "descriptions", name: 'description', type: "text", warning: "" },
    QUANTITY_IN_DEPOT: { id: "quantityInDepot", name: 'quantity in Depot', type: "text", warning: "" },
    PRICE: { id: "price", name: 'price', type: "text", warning: "" },
    DISCOUNT: { id: "discount", name: 'discount', type: "text", warning: "" },
}



export function CustomeProduct({ id = '', back, data }) {
    const [, dispatch] = useStateValue();
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (data.name) {
            setState({
                ...data,
                imageSide1: data.images[0],
                imageSide2: data.images[1],
                imageSide3: data.images[2],
            })
        }
    }, [])

    const inputsHandler = (e, inputName) => {

        const value = e.target.value;
        console.log(inputName, value)
        switch (inputName) {
            case inputsName.IMAGE_SIDE_1.id:
                setState({
                    ...state,
                    imageSide1: e.target.files[0]
                })
                break;
            case inputsName.IMAGE_SIDE_2.id:
                setState({
                    ...state,
                    imageSide2: e.target.files[0]
                })
                break;
            case inputsName.IMAGE_SIDE_3.id:
                setState({
                    ...state,
                    imageSide3: e.target.files[0]
                })
                break;
            case inputsName.NAME.id:
                setState({
                    ...state,
                    name: value
                })
                break;
            case inputsName.CATEGORY.id:
                setState({
                    ...state,
                    category: value
                })
                break;
            case inputsName.COLOR.id:
                setState({
                    ...state,
                    color: value
                })
                break;
            case inputsName.BRANDNAME.id:
                setState({
                    ...state,
                    brandName: value
                })
                break;
            case inputsName.SIZE.id:
                setState({
                    ...state,
                    size: value
                })
                break;
            case inputsName.PRICE.id:
                setState({
                    ...state,
                    price: value
                })
                break;
            case inputsName.DESCRIPTION.id:
                setState({
                    ...state,
                    descriptions: value
                })
                break;
            case inputsName.QUANTITY_IN_DEPOT.id:
                setState({
                    ...state,
                    quantityInDepot: value
                })
                break;
            case inputsName.DISCOUNT.id:
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
            console.log(item)
            if (item == inputsName.IMAGE_SIDE_1.id || item == inputsName.IMAGE_SIDE_2.id || item == inputsName.IMAGE_SIDE_3.id) {
                if (typeof state[item] == 'string') {
                    formData.append(item + "", null)
                    continue;
                }
            }
            formData.append(item + "", state[item])
        }
        let httpMethod = 'POST';
        if (id != '') {
            formData.append("id", id)
            httpMethod = 'PUT'
        }

        fetch('http://localhost:8080/api/products', {
            method: httpMethod,
            headers: {
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
    /* this function is going to clear current state   */
    const clearAll = () => {
        setState(initialState);
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
                    <div className="input-group">
                        {Object.keys(inputsName).map(item => {
                            if (inputsName[item].type == "file") {

                                let image;
                                console.log(data)
                                if (!data.name) {
                                    if (state[inputsName[item].id]) {
                                        console.log("add cond first if")
                                        image = URL.createObjectURL(state[inputsName[item].id])
                                    } else {
                                        console.log("add cond second if")
                                        image = "/image/slide-17.jpg"
                                    }
                                } else {
                                    console.log(typeof state[inputsName[item].id])

                                    if (typeof state[inputsName[item].id] == 'string') {
                                        console.log("in string state")
                                        image = state[inputsName[item].id]
                                    } else {
                                        console.log("in file state")
                                        image = URL.createObjectURL(state[inputsName[item].id])
                                    }
                                }
                                console.log(image)
                                return (
                                    <div key={inputsName[item].id} className="input-box input_upload">
                                        <label>{inputsName[item].name}</label>
                                        <img
                                            src={image}
                                        />
                                        <input type="file" accept='image/*' placeholder="image" onChange={(e) => inputsHandler(e, inputsName[item].id)} />
                                        <i className="bi bi-cloud-upload"></i>
                                    </div>
                                )
                            }
                            return (
                                <div key={inputsName[item].id} className="input-box">
                                    <label>{inputsName[item].name}</label>
                                    <input type={inputsName[item].type} value={state[inputsName[item].id]} placeholder={inputsName[item].name} onChange={(e) => inputsHandler(e, inputsName[item].id)} />
                                </div>
                            )
                        })}
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