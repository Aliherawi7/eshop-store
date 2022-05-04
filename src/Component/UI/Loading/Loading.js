import React from 'react'
import './Loading.css'

const Loading = () =>{

    return (
        <div className="loading-container">
            <div className="rotate">
                <div className="loader">
                    <span style={{'--i':'0'}}></span>
                    <span style={{'--i':'1'}}></span>
                    <span style={{'--i':'2'}}></span>
                    <span style={{'--i':'3'}}></span>
                </div>
            </div>
        </div>
    )
}

export default Loading