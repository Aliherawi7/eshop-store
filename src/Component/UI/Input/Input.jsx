import React from 'react'
import "./Input.css"

const Input = (props) => {
    let classArray = ["input-component"]
    let containerClass = ["input-container"]

    if (!props.isValid && props.isUsed) {
        containerClass.push("invalid")

    } else if (containerClass.length > 1) {
        containerClass = ["input-container"]
    }

    if (props.isUsed) {
        containerClass.push("focus")
    }
    let element;
    if (props.type == 'file') {
        element = (<div className='image-input'>
            <img src={props.value ? URL.createObjectURL(props.value) : "/image/avatar.png"} />
            <input
                type={props.type}
                name={props.name}

                accept='image/*'
                className={classArray.join(' ')}
                onChange={props.change} />
            <i className='bi bi-cloud-upload'></i>
            <span className="warning-message">{props.warningMessage}</span>
        </div>)
    } else {
        element = (
            <div className={containerClass.join(' ')}>
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    className={classArray.join(' ')}
                    onChange={props.change}
                />
                <label>{props.placeholder}</label>
                <span className="warning-message">{props.warningMessage}</span>
            </div>
        )
    }

    return element
}

export default Input