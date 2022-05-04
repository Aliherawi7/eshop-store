import React, { useState } from "react";
import "./GetStart.css"
import Slider from "../../Slider/Slider";
import Button from '../../UI/Button/Button'
import { useNavigate } from "react-router-dom";
const GetStart = (porps) =>{
    const [input, setInput] = useState({value:''})
    const navigate = useNavigate()
    const searchBtnHandler = ()=>{
        if(input.value)
            navigate('/search/'+input.value)
    }
    const changeHandler =(e)=>{
        setInput({value: e.target.value})
    }
    return (
        <div className="getstart">
            <div className="title">
                <h2>Welcome to eShop Store</h2>
                <div className="rearch-box">
                    <input name="search" value={input.value} onChange={(e)=>(changeHandler(e))} placeholder="what do you need?" />
                    <Button btnType="success" click={searchBtnHandler}><i className="bi bi-search"></i></Button>
                </div>
            </div>
            <div className="background">
                <Slider />
            </div>
        </div>
    )
}

export default GetStart