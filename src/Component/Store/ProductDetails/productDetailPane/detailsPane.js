import React, { useState } from 'react'
import "./detailsPane.css"
import ReviewPane from './ReviewPane/ReviewPane'
import DataSheet from './DataSheet/DataSheet'
import Description from './Description/Description'

const DetailsPane = (props) => {
    const [state, setstate] = useState({
        description: {
            li: "tap-pane tap-active",
            content: "content-pane content-active",
            transition: true
        },
        dataSheet: {
            li: "tap-pane ",
            content: "content-pane",
            transition: false
        },
        reviews: {
            li: "tap-pane ",
            content: "content-pane",
            transition: false
        }
    })
    // tab click and show active tab content
    const active = (id) => {
        const oldState = { ...state }
        for (let i in oldState) {
            oldState[i].li = "tap-pane "
            oldState[i].content = "content-pane "
            oldState[i].transition = false
        }
        oldState[id].li = oldState[id].li + "tap-active"
        oldState[id].content = oldState[id].content + "content-active"
        oldState[id].transition = true
        setstate(oldState)
    }

    return (
        <div className="details-pane">
            <ul className="tap-list">
                <li key={'description'}
                    className={state.description.li}
                    onClick={() => { active("description") }}>
                    <i className="bi bi-receipt"></i>
                    Descriptions
                </li>

                <li
                    key={'dataSheet'}
                    className={state.dataSheet.li}
                    onClick={() => { active("dataSheet") }}>
                    <i className="bi bi-table"></i>
                    Data Sheet
                </li>

                <li
                    key={'reviews'}
                    className={state.reviews.li}
                    onClick={() => { active("reviews") }}>
                    <i className="bi bi-people"></i>
                     Reviews</li>
            </ul>
            <div className="tap-content">
                <div className={state.description.content} >
                    <Description transition={state.description.transition} description={props.description} />
                </div>
                <div className={state.dataSheet.content} >
                    <DataSheet dataSheet={props.dataSheet} transition={state.dataSheet.transition} />
                </div >
                <div className={state.reviews.content}>
                    <ReviewPane productName={props.productName} people={props.people} transition={state.reviews.transition} />
                </div>
            </div>
        </div>
    )
}

export default DetailsPane