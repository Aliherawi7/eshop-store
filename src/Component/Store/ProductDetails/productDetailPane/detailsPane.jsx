import React, { useState } from 'react'
import "./detailsPane.css"
import ReviewPane from './ReviewPane/ReviewPane'
import DataSheet from './DataSheet/DataSheet'

const DetailsPane = (props) => {
    const [state, setstate] = useState({
        description: {
            li: "tap-pane tap-active",
            content: "content-pane content-active",
        },
        dataSheet: {
            li: "tap-pane ",
            content: "content-pane",
        },
        reviews: {
            li: "tap-pane ",
            content: "content-pane",
        }
    })
    // tab click and show active tab content
    const active = (id) => {
        const oldState = { ...state }
        for (let i in oldState) {
            oldState[i].li = "tap-pane "
            oldState[i].content = "content-pane "
        }
        oldState[id].li = oldState[id].li + "tap-active"
        oldState[id].content = oldState[id].content + "content-active"
        setstate(oldState)
    }

    return (
        <div className="details-pane">
            <ul className="tap-list">
                <li key={'description'}
                    className={state.description.li}
                    onClick={() => { active("description") }}>
                    Details
                </li>

                <li
                    key={'dataSheet'}
                    className={state.dataSheet.li}
                    onClick={() => { active("dataSheet") }}>
                    Features
                </li>

                <li
                    key={'reviews'}
                    className={state.reviews.li}
                    onClick={() => { active("reviews") }}>
                    Reviews</li>
            </ul>
            <div className="tap-content">
                <div className={state.description.content} >
                    <div className={`description-content fade-in`}>
                        <h4>Descriptions</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quod in quae, omnis, expedita ex eveniet voluptate dolores sequi qui quo eos earum ipsam laboriosam eius aliquam amet consequatur explicabo!
                        </p>
                    </div>
                </div>
                <div className={state.dataSheet.content} >
                    <DataSheet dataSheet={props.dataSheet} />
                </div >
                <div className={state.reviews.content}>
                    <ReviewPane productId={props.dataSheet.id} />
                </div>
            </div>
        </div>
    )
}

export default DetailsPane