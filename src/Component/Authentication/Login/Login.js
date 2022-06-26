import React, { useState } from 'react'
import "./Login.css"
import Input from "../../UI/Input/Input"
import Button from '../../UI/Button/Button'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
const Login = (props) => {
    const [loginInputState, setLoginInputState] = useState({
        email: {
            type: 'email',
            placeholder: 'username/email',
            name: 'email',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        },
        password: {
            type: 'password',
            placeholder: 'password',
            name: 'password',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        }
    })
    const [eyeState, eyeSetState] = useState({ className: 'bi bi-eye-slash' })

    const changeLoginHandler = (event, item) => {
        const updatedForm = { ...loginInputState }
        const updatedElement = updatedForm[item]
        updatedElement.value = event.target.value
        updatedElement.warningMessage = ''
        updatedElement.isUsed = true
        updatedElement.isValid = true

        if (item === 'email') {
            let pattern = /([a-z0-9_-]+)@([\da-z-]+)\.([a-z]{2,6})/ig;
            if (pattern.test(updatedElement.value)) {
                updatedElement.isValid = true
                updatedElement.warningMessage = ''
            } else {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'invalid email address'
            }
        }
        if (updatedElement.value.length === 0) {
            updatedElement.isUsed = false
            updatedElement.warningMessage = ''
        }
        updatedForm[item] = updatedElement
        setLoginInputState(updatedForm)


    }

    //check password validation
    const checkPasswordValidation = (value) => {
        if (value.trim() === '') {
            return 'empty'
        }
        if (value.length < 5) {
            return 'short'
        }
    }
    // eye button hnadler 
    const eyeBtnHandler = (name) => {
        const oldInputState = {...loginInputState}
        if (eyeState.className === 'bi bi-eye' ) {
            eyeSetState({ className: 'bi bi-eye-slash' })
            oldInputState.password.type = 'password'
            setLoginInputState(oldInputState)
        }
        else {
            eyeSetState({ className: 'bi bi-eye' })
            oldInputState.password.type = 'text'
            setLoginInputState(oldInputState)
        }
    }

    const login = () => {
        const checkEmail = loginInputState.email
        const checkPassword = loginInputState.password

        if (checkPasswordValidation(checkEmail.value) === 'empty' || !checkEmail.isValid) {
            const holder = { ...loginInputState };
            holder.email.warningMessage = 'fill it'
            holder.email.isUsed = true
            holder.email.isValid = false
            setLoginInputState(holder)
            return
        }
        if (checkPasswordValidation(checkPassword.value) === 'short' || !checkPassword.isValid) {
            const holder = { ...loginInputState };
            holder.password.warningMessage = 'fill it'
            holder.password.isUsed = true
            holder.password.isValid = false
            setLoginInputState(holder)
            return
        }

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: 'login'
            },
            body: JSON.stringify({ name: checkEmail.value, password: checkPassword.value })
        }).then((response) => {
            console.log(response)
        })


    }

    let loginInputArray = []
    for (let x in loginInputState) {
        loginInputArray.push({
            id: x,
            config: loginInputState[x]
        })
    }

    return (
        <Transition timeout={1000} in={true} exit={true} appear>
            {(status) => (
                <div className={`login-container login-${status}`}>
                    <img className='eshop-logo' src='/image/eshop-logo.png' />
                    <form className="login">
                        <h2>Login</h2>
                        {loginInputArray.map((item) => {
                            return (
                                <>
                                    {(item.config.name !== 'email') ?
                                        <Button btnType={'show-password'} click={() => (eyeBtnHandler(item.name))}><i className={eyeState.className}></i></Button> : null}
                                    <Input
                                        type={item.config.type}
                                        name={item.config.name}
                                        placeholder={item.config.placeholder}
                                        value={item.config.value}
                                        isValid={item.config.isValid}
                                        isUsed={item.config.isUsed}
                                        key={item.id}
                                        change={(event) => changeLoginHandler(event, item.id)}
                                        warningMessage={item.config.warningMessage}
                                    />
                                </>
                            )
                        })}
                        <Button btnType={"success"} click={login}>Login</Button>
                        <Link to="/signup" className="already-account">Don't have account?</Link>
                    </form>
                </div>
            )}

        </Transition>


    )
}

export default Login