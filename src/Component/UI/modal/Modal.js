import React from 'react'
import './Modal.css'
import Backdrop from '../backrop/Backdrop'

const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.show} modalClose = {props.ModalClose}/>
            <div className="modal" style = {
                {transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
                }
            }>
                {props.children}
            </div>
        </>
    )
}

export default Modal