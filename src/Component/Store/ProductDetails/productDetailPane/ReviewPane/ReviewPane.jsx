import React, { useState } from 'react'
import './ReviewPane.css'
import Button from '../../../../UI/Button/Button'
import RateStar from '../../../Rate-Star/RateStar'

const ReviewPane = (props) => {
    const [textareaState, textareaSetState] = useState({
        name: 'review', value: '', emptyState: ''
    })
    const [optionState, optionSetstate] = useState({
        name: 'rate', value: '', isValid: false, rateLevel: ''
    })

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
        if (!optionState.isValid) {
            const oldState = { ...optionState }
            oldState.rateLevel = 'not Rated'
            optionSetstate(oldState)
            return
        }
        if (textareaState.value === '') {
            const oldState = { ...textareaState }
            oldState.emptyState = 'type something, please'
            textareaSetState(oldState)
            return
        }
    }

    return (
        <div className={`review-content fade-in`}>
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