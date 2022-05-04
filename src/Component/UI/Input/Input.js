import React from 'react'
import "./Input.css"

const Input = (props) => {
    let classArray = ["input-component"]
    let containerClass = ["input-container"]

    if(!props.isValid && props.isUsed){
       console.log(props.isValid , props.isUsed,"in input")
       containerClass.push("invalid")

    }else if(containerClass.length > 1){
        containerClass= ["input-container"]
    }
    
    if(props.isUsed){
        containerClass.push("focus")
    }

    return(
        <div className={containerClass.join(' ')}>
            <input 
            type={props.type}
            name={props.name} 
            value={props.value} 
            className={classArray.join(' ')}
            onChange={props.change}
            />
            <label>{props.placeholder}</label>
            <u></u>
            <span className="warning-message">{props.warningMessage}</span>
        </div>
    )
}

export default Input