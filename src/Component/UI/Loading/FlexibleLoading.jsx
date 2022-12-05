import React from 'react'
import "./Loading.css"

function FlexibleLoading() {
    const widthAndHeight = {width: "0.7rem", height: "0.7rem"}
    return (
        <div className="FlexibleLaoding" style={{
            backgroundColor: "inherit",
            position: "relative",
            height: "100%",
            width:"100%"
        }}>
            <div className="spinner">
                <div className="bounce1" style={widthAndHeight}></div>
                <div className="bounce2" style={widthAndHeight}></div>
                <div className="bounce3" style={widthAndHeight}></div>
            </div>
        </div>
    )
}

export default FlexibleLoading