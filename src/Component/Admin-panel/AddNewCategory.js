import React, { useState } from "react"
import "./AddNewProduct.css"
import Button from "../UI/Button/Button";
import { useStateValue } from "../../StateProvider";
import { actions } from "../../reducer";

export function AddNewCategory(props) {
    const [{loading},dispatch] = useStateValue(); 
    const [state, setState] = useState({
        name: '',
        description: '',
        quantityInDepot: '',
        status:false
    });

    const inputsName = {
        NAME: 'NAME',
        DESCRIPTION: 'DESCRIPTION',
        QUANTITY_IN_DEPOT: 'QUANTITY_IN_DEPOT',
        STATUS: 'STATUS'
    }
    const inputsHandler = (e, inputName) => {
        const value = e.target.value;
        console.log(state) 
        switch (inputName) {
            case inputsName.NAME:
                setState({
                    ...state,
                    name: value
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
            case inputsName.STATUS:
                setState({
                    ...state,
                    status: e.target.checked
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
        dispatch({
            type: actions.LOADING
        })
        fetch('http://localhost:8080/api/categories/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(state)

        }).then(res => {
            if (res.ok) {
                
                clearAll();
            }
        }).catch(error => {
            console.log(error)
        })

        
    }

    const clearAll = () => {
        setState({
            name: '',
            description: '',
            quantityInDepot: '',
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
            <div className='add-product-form'>
                <form style={{ "--i": "#b44ac6" }}>
                    <div className="input-group">
                        <div className="input-box">
                            <label>Categroy Name</label>
                            <input type="text" value={state.name} placeholder="product name" onChange={(e) => inputsHandler(e, inputsName.NAME)} />
                        </div>
                        <div className="input-box">
                            <label>Amount in depot</label>
                            <input type="number" value={state.quantityInDepot} min={0} placeholder="amount in depot" onChange={(e) => inputsHandler(e, inputsName.QUANTITY_IN_DEPOT)} />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-box">
                            <label>Descriptions</label>
                            <input type="text" value={state.description} placeholder="descriptions" onChange={(e) => inputsHandler(e, inputsName.DESCRIPTION)} />
                        </div>
                        <div className="input-box">
                            <label>Status</label>
                            <input type="checkbox" value={state.status} onChange={(e) => inputsHandler(e, inputsName.STATUS)} />
                            <div className="check-box"></div>
                        </div>
                    </div>

                    <div className="input-box incomplete-inputs">
                        <span>{warningMessage.length > 0 ? "Please fill the: " + warningMessage.map(item => ' ' + item) : ""}</span>
                    </div>
                    <div className="button-container" >
                        <Button btnType="success save"  click={addProductToDB}>
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

export default AddNewCategory