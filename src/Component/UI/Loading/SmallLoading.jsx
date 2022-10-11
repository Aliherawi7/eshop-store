import React from 'react'
import "./Loading.css"

function SmallLoading(props) {
    return (
        <div className="small-loading" style={{
            visibility: props?.visible ? "visible":"hidden",
            backgroundColor:props?.backgroundColor,
            opacity: props?.visible ? 1:0,
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