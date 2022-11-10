import React, { useState, useEffect } from 'react'
import './ReviewPane.css'
import Button from '../../../../UI/Button/Button'
import RateStar from '../../../Rate-Star/RateStar'
import { BytesToFile } from '../../../../Utils/BytesToFile'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const ReviewPane = () => {
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [textareaState, textareaSetState] = useState({
        name: 'review', value: '', isValid: false, warningMessage: ''
    })
    const [optionState, optionSetstate] = useState({
        name: 'rate', value: '', isValid: false, rateLevel: ''
    })
    useEffect(() => {
        function getReviews() {
            fetch('http://localhost:8080/api/comments/products/' + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(data => {
                    data.map(item => {
                        item.userImage = BytesToFile(item.userImage, { contentType: "image/png" })
                        return item
                    })
                    setReviews(data);
                    console.log(reviews, "reivew in fetch")
                })
        }
        getReviews();
    }, [id])



    const textareaChangeHandler = (e) => {
        const oldState = { ...textareaState }
        oldState.value = e.target.value
        oldState.isValid = true
        if (oldState.value.length > 5) {
            oldState.warningMessage = ''
        } else {
            oldState.warningMessage = 'Review'
        }
        textareaSetState(oldState)
    }
    const optionChangeHandler = (event) => {
        const oldState = { ...optionState }
        oldState.value = event.target.value
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
            oldState.warningMessage = 'type something, please'
            oldState.isValid = false
            textareaSetState(oldState)
            return
        }
        fetch("http://localhost:8080/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                productId: id,
                message: textareaState.value,
                rate: optionState.value
            })
        }).then(res => {
            if (res.ok) {
                toast.success("comment added successfully");
                return res.json();
            } else {
                toast.error("oaps something went wrong");
                throw new Error(res.status);
            }
        }).then(data => {
            data.userImage = BytesToFile(data.userImage, "image/png")
            console.log(data)
            clearInput();
            setReviews([...reviews, data])
        }).catch(error => console.log(error));
    }

    // clear review input after sending the review to the server
    const clearInput = () => {
        textareaSetState({
            name: 'review', value: '', isValid: false, warningMessage: ''
        })
        optionSetstate({
            name: 'rate', value: '', isValid: false, rateLevel: ''
        })
    }

    // perform the like action on comment
    const likesTheComment = (commentId) => {
        fetch(`http://localhost:8080/api/comments/${commentId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            }
        }).then(res => res.json())
            .then(data => {
                data.userImage = BytesToFile(data.userImage, "image/png")
                const reviewIndex = reviews.findIndex(item => {
                    return item.commentId == commentId
                })
                const temp = [...reviews];
                temp[reviewIndex] = data
                setReviews(temp);
            })
    }
    // perform the like action on comment
    const dislikesTheComment = (commentId) => {
        fetch(`http://localhost:8080/api/comments/${commentId}/dislike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            }
        }).then(res => res.json())
            .then(data => {
                data.userImage = BytesToFile(data.userImage, "image/png")
                const reviewIndex = reviews.findIndex(item => {
                    return item.commentId == commentId
                })
                const temp = [...reviews];
                temp[reviewIndex] = data
                setReviews(temp);
            })
    }

    return (
        <div className={`review-content fade-in`}>
            <h4 className="title">All Reviews {reviews.length}</h4>
            <div className="last-review">
                {reviews.length > 0 ? reviews.map((item) => {
                    return (
                        <div className="people-review border-bottom" key={Math.random()}>
                            <div className='review-header'>
                                <img src={item.userImage} />
                                <div className='name-rate'>
                                    <h4>{item.userName}</h4>
                                    <RateStar rate={item.rate} size={"small"} />
                                </div>
                            </div>
                            <div className='review-body'>
                                <p className="review-text">{item.message}</p>
                                <div className="likes-date-rate">
                                    <div className='likes-dislikes align_center' >
                                        <div className='align_center' onClick={() => likesTheComment(item.commentId)}>
                                            <i className='bi bi-hand-thumbs-up-fill' style={{ color: "#39a1f2", padding: "5px" }}></i>
                                            <label style={{ color: "#6fc04b" }}>{item.likes == 0 ? "" : item.likes}</label>
                                        </div>
                                        <div className='align_center' onClick={() => dislikesTheComment(item.commentId)}>
                                            <i className='bi bi-hand-thumbs-down-fill' style={{ padding: "5px" }}></i>
                                            <label style={{ color: "#e15817" }}>{item.disLikes == 0 ? "" : item.disLikes}
                                            </label>
                                        </div>
                                    </div>
                                    <p>{item.commentDate}</p>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p>Be first reviewer</p>}
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