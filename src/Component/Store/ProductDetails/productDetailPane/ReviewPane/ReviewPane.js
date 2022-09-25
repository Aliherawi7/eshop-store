import React, { useState } from 'react'
import './ReviewPane.css'
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import RateStar from '../../../Rate-Star/RateStar'

const ReviewPane = (props) => {
    const [inputState, inputSetstate] = useState([
        { name: 'name', value: '', isUsed: false, isValid: false, warningMessage: '' },
        { name: 'email', value: '', isUsed: false, isValid: false, warningMessage: '' }
    ])
    const [textareaState, textareaSetState] = useState({
        name: 'review', value: '', emptyState: ''
    })
    const [optionState, optionSetstate] = useState({
        name: 'rate', value: '', isValid: false, rateLevel: ''
    })

    //input change handler function
    const inputChangeHandler = (e, name) => {
        const oldState = [...inputState];
        const targetInputIndex = oldState.findIndex((item) => {
            return item.name === name
        })
        if (name === 'email') {
            let pattern = /([a-z0-9_-]+)@([\da-z-]+)([a-z]{2,6})/ig;
            if (pattern.test(oldState[targetInputIndex].value)) {
                oldState[targetInputIndex].isValid = true
                oldState[targetInputIndex].warningMessage = ''
            } else {
                oldState[targetInputIndex].isValid = false
                oldState[targetInputIndex].warningMessage = 'invalid email address'
            }
        } else {
            let pattern = /([a-z0-9])/ig;
            if (pattern.test(oldState[targetInputIndex].value)) {
                oldState[targetInputIndex].isValid = true
                oldState[targetInputIndex].warningMessage = ''
            } else {
                oldState[targetInputIndex].isValid = false
                oldState[targetInputIndex].warningMessage = 'invalid name'
            }
        }
        oldState[targetInputIndex].value = e.target.value;
        if (oldState[targetInputIndex].value.length > 0) {
            oldState[targetInputIndex].isUsed = true;
            oldState[targetInputIndex].isValid = true;
        } else {
            oldState[targetInputIndex].isUsed = false;
            oldState[targetInputIndex].isValid = false;
            oldState[targetInputIndex].warningMessage = ''

        }

        inputSetstate(oldState)
    }
    const textareaChangeHandler = (e) => {
        const oldState = { ...textareaState }
        oldState.value = e.target.value
        if (oldState.value === '') {
            oldState.emptyState = ''
        } else {
            oldState.emptyState = 'Review'
        }
        textareaSetState(oldState)
    }
    const optionChangeHandler = (event) => {
        const oldState = { ...optionState }

        if (event.target.value < 3) {
            oldState.rateLevel = "weak"
        } else if (event.target.value < 4) {
            oldState.rateLevel = "medium"
        }
        else {
            oldState.rateLevel = "good"
        }
        if (event.target.value > 0) {
            oldState.isValid = true
        }
        optionSetstate(oldState)
    }
    // submit the review + checking the values
    const submitReview = () => {
        const checkName = inputState[0]
        const checkEmail = inputState[1]
        if (!checkName.isValid) {
            const oldState = [...inputState]
            oldState[0].isUsed = true
            oldState[0].warningMessage = 'fill it'
            inputSetstate(oldState)
            return
        }
        if (!checkEmail.isValid) {
            const oldState = [...inputState]
            oldState[1].isUsed = true
            oldState[1].warningMessage = 'fill it'
            inputSetstate(oldState)
            return
        }
        if (!optionState.isValid) {
            const oldState = { ...optionState }
            oldState.rateLevel = 'notRated'
            optionSetstate(oldState)
            return
        }
        if (textareaState.value === '') {
            const oldState = { ...textareaState }
            oldState.emptyState = 'notReview'
            textareaSetState(oldState)
            return
        }
    }

    return (
        <div className={`review-content review-content-entering`}>
            <div className="last-review">
                {props.people.map((item) => {
                    return (
                        <div className="people-review" key={Math.random()}>
                            <img src={item.avatar} />
                            <h4>{item.name}</h4>
                            <p className="review-text">{item.reviewText}</p>
                            <div className="date-rate">
                                <p>{item.date}</p>
                                <RateStar rate={4} size={"small"} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <h4 className="form-title">ADD REVIEW</h4>
            <form className="review-form">
                {
                    inputState.map((item) => {
                        return (
                            <Input
                                type={item.name}
                                name={item.name}
                                key={item.name}
                                placeholder={item.name}
                                className="input-name"
                                value={item.value}
                                isUsed={item.isUsed}
                                isValid={item.isValid}
                                warningMessage={item.warningMessage}
                                change={(event) => (inputChangeHandler(event, item.name))}
                            />
                        )
                    })
                }
                {
                    <select className={optionState.rateLevel} defaultValue={"Rating"} onChange={(event) => (optionChangeHandler(event))}>
                        <option disabled>Rating</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                }
                <textarea
                    placeholder={textareaState.name}
                    onChange={(event) => (textareaChangeHandler(event))}
                    value={textareaState.value}
                    className={textareaState.emptyState}>

                </textarea>
                <Button btnType="success" click={submitReview}>submit review</Button>
            </form>
        </div>
    )
}

export default ReviewPane