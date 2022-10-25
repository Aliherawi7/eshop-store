import React, { useState } from 'react'
import "./Login.css"
import Input from "../../UI/Input/Input"
import Button from '../../UI/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from "../../../StateProvider"
import { actions } from '../../../reducer'
import { BytesToFile } from '../../Utils/BytesToFile'
const Login = () => {
    const navigate = useNavigate();
    const [loginInputState, setLoginInputState] = useState({
        email: {
            type: 'email',
            placeholder: 'email',
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
    const [state, dispatch] = useStateValue()
    const [eyeState, eyeSetState] = useState({ className: 'bi bi-eye-slash' })
    const [signinState, setSigninState] = useState("Sign in")

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
        const oldInputState = { ...loginInputState }
        if (eyeState.className === 'bi bi-eye') {
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
        setSigninState("sending request...")
        const checkEmail = loginInputState.email
        const checkPassword = loginInputState.password

        if (checkPasswordValidation(checkEmail.value) === 'empty' || !checkEmail.isValid) {
            const holder = { ...loginInputState };
            holder.email.warningMessage = holder.email.warningMessage.length >0 ? holder.email.warningMessage : "fill it"
            holder.email.isUsed = true
            holder.email.isValid = false
            setLoginInputState(holder)
            setSigninState("Sign in")
            return
        }
        if (checkPasswordValidation(checkPassword.value) === 'short' || !checkPassword.isValid) {
            const holder = { ...loginInputState };
            holder.password.warningMessage = holder.password.warningMessage.length >0 ? holder.password.warningMessage : "fill it"
            holder.password.isUsed = true
            holder.password.isValid = false
            setLoginInputState(holder)
            setSigninState("Sign in")
            return
        }


        fetch("http://localhost:8080/api/login", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "POST",
            body: new URLSearchParams({
                'email': checkEmail.value,
                'password': checkPassword.value
            })

        }).then(res => {
            if (res.status == 200) {
                return res.json();
            }
            
        }).then(data => {
            console.log(data)
            if (data.error_message) {
                console.log("in if")
                const updatInputMessage = { ...loginInputState };
                if (data.error_message.includes("email")) {
                    console.log("in 2 if")
                    updatInputMessage.email.warningMessage = data.error_message
                    updatInputMessage.email.isValid = false
                }else{
                    updatInputMessage.password.warningMessage = (data.error_message +" ")+ (data.lock_expireDate? data.lock_expireDate:"")
                    updatInputMessage.password.isValid = false
                }

                setSigninState("Sign in")
                setLoginInputState(updatInputMessage)
                return
            }
            localStorage.setItem("accessToken", data?.access_token);
            localStorage.setItem("refreshToken", data?.refresh_token);
            localStorage.setItem("name", data?.userInformationDTO?.name)
            localStorage.setItem("lastName", data?.userInformationDTO?.lastName)
            localStorage.setItem("email", data?.userInformationDTO?.email)
            localStorage.setItem("image", data?.userInformationDTO?.image)
            localStorage.setItem("roles", data?.userInformationDTO?.roles)
            data.userInformationDTO.access_token = data?.access_token
    
            dispatch({
                type: actions.ADD_USER_INFORMATION,
                item: data.userInformationDTO
            })
            navigate("/")
        }).catch(error => console.log(error))
        setSigninState("Sign in")
    }

    let loginInputArray = []
    for (let x in loginInputState) {
        loginInputArray.push({
            id: x,
            config: loginInputState[x]
        })
    }

    return (
        <div className={`login-container login-entering`}>
            <Link to="/">
                <img className='eshop-logo' src='/image/eshop-logo.png' />
            </Link>
            <form className="login">
                <h2>Sign in</h2>
                {loginInputArray.map((item) => {
                    return (
                        <React.Fragment key={item}>
                            {(item.config.name !== 'email') ?
                                <Button btnType={'show-password'} click={() => (eyeBtnHandler(item.name))}><i className={eyeState.className} key={item.id}></i></Button> : null}
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
                        </React.Fragment>
                    )
                })}
                <Button btnType={"success"} click={login}>{signinState}</Button>
                <p>By clicking the sign in you agree to the <strong>eshop</strong> Conditions of Use & Sale</p>
                <Link to="/signup" className="already-account">create eshop account</Link>
                <ul className='login-with-third-party'>
                    <li style={{ "--tp": "#c70202" }}><a><i className='bi bi-google'></i></a></li>
                    <li style={{ "--tp": "#166bf3" }}><a><i className='bi bi-facebook'></i></a></li>
                    <li style={{ "--tp": "#01b5f2" }}><a><i className='bi bi-twitter'></i></a></li>
                </ul>
            </form>

        </div>


    )
}

export default Login