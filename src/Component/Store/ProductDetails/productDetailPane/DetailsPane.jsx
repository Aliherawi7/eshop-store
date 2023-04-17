import React, { useState, useEffect } from 'react'
import "./DetailsPane.css"
import ReviewPane from './ReviewPane/ReviewPane'
import DataSheet from './DataSheet/DataSheet'
import Descriptions from './Descriptions/Descriptions'

const TAPS = {
    reviewPane: { name: 'reviewPane', component: ReviewPane },
    dataSheet: { name: 'dataSheet', component: DataSheet },
    description: { name: 'describtion', component: Descriptions }
}
const DetailsPane = (props) => {
    const [state, setstate] = useState(TAPS.dataSheet)
    const [data, setData] = useState("")
    // tab click and show active tab content

    useEffect(() => {
        switch (state?.name) {
            case TAPS.dataSheet.name:
                setData(props.dataSheet)
        }

    }, [])




    return (
        <div className="details-pane">
            <ul className="tap-list">
                <li key={'description'}
                    className={"" + state.name == TAPS.description.name ? 'tap-active' : ''}
                    onClick={() => { setstate(TAPS.description) }}>
                    Details
                </li>

                <li
                    key={'dataSheet'}
                    className={"" + state.name == TAPS.dataSheet.name ? 'tap-active' : ''}
                    onClick={() => { setstate(TAPS.dataSheet) }}>
                    Features
                </li>

                <li
                    key={'reviews'}
                    className={"" + state.name == TAPS.reviewPane.name ? 'tap-active' : ''}
                    onClick={() => { setstate(TAPS.reviewPane) }}>
                    Reviews</li>
            </ul>
            <div className="tap-content">
                <div >
                    <state.component data={data} />
                </div >
                {/* <div className={state.dataSheet.content} >
                    <DataSheet dataSheet={props.dataSheet} />
                </div >
                <div className={state.reviews.content}>
                    <ReviewPane productId={props.dataSheet.id} />
                </div> */}

            </div>
        </div>
    )
}

export default DetailsPane
