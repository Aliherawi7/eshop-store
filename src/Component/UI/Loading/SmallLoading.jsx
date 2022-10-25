import React from 'react'
import "./Loading.css"

function SmallLoading({visible, backgroundColor, top, left, right, bottom, position = "fixed" }) {
    return (
        <div className="small-loading" style={{
            visibility: visible ? "visible":"hidden",
            backgroundColor:backgroundColor,
            opacity: visible ? 1:0,
            top: top,
            bottom: bottom,
            left: left,
            right:right,
            position: position
            }}>
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    )
}

export default SmallLoading