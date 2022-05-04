import React, { useState } from 'react'
import "../Login/Login.css"
import Input from "../../UI/Input/Input"
import Button from '../../UI/Button/Button'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
const Signup = (props) => {
    const [passwordEyeState, passwordEyeSetState] = useState({
        passwordEyeIcon: 'bi bi-eye-slash', repeatPasswordEyeIcon: 'bi bi-eye-slash'
    })
    const [signupInputState, setSignupInputState] = useState({
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

        },
        passwordRepeat: {
            type: 'password',
            placeholder: 'Repeat password',
            name: 'passwordRepeat',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''

        }
    })

    const changeSignupHandler = (event, item) => {
        const updatedForm = { ...signupInputState }
        const updatedElement = updatedForm[item]
        updatedElement.value = event.target.value
        updatedElement.isUsed = true

        if (item === 'email') {
            let pattern = /([a-z0-9_-]+)@([\da-z-]+)([a-z\.]{2,6})/ig;
            if (pattern.test(updatedElement.value)) {
                updatedElement.isValid = true
                updatedElement.warningMessage = ''
            } else {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'invalid email address'
            }
        }
        if (item === 'password') {
            updatedElement.warningMessage = ''
            if (checkPasswordValidation(event.target.value) === 'empty') {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'do not use just space character'
            }
            if (checkPasswordValidation(event.target.value) === 'short') {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'at least five characters'
            } else {
                updatedElement.isValid = true
                updatedElement.warningMessage = ''
            }
            if (updatedElement.value !== updatedForm['passwordRepeat'].value && updatedForm['passwordRepeat'].isUsed) {
                updatedForm['passwordRepeat'].warningMessage = 'not matched'
                updatedForm['passwordRepeat'].isValid = false
            } else if(updatedElement.value === updatedForm['passwordRepeat'].value){
                updatedForm['passwordRepeat'].isValid = true
                updatedForm['passwordRepeat'].warningMessage = ''
            }
        }
        if (item === 'passwordRepeat') {
            updatedElement.warningMessage = ''
            if (updatedElement.value !== updatedForm['password'].value) {
                updatedElement.warningMessage = 'not matched'
                updatedElement.isValid = false
            } else {
                updatedElement.isValid = true
                updatedElement.warningMessage = ''
            }
        }

        if (updatedElement.value.length == 0) {
            updatedElement.isUsed = false
            updatedElement.isValid = false
            updatedElement.warningMessage = ''
        }
        updatedForm[item] = updatedElement
        setSignupInputState(updatedForm)


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
    const eyeBtnHandler = (name, inputName) => {
        const oldEyeState = { ...passwordEyeState }
        const oldInputState = { ...signupInputState }
        console.log('in passsssssssssss')
        if (name == 'password') {
            if (passwordEyeState.passwordEyeIcon == 'bi bi-eye') {
                oldEyeState.passwordEyeIcon = 'bi bi-eye-slash'
                passwordEyeSetState(oldEyeState)
                oldInputState.password.type = 'password'
                setSignupInputState(oldInputState)
            }
            else {
                oldEyeState.passwordEyeIcon = 'bi bi-eye'
                passwordEyeSetState(oldEyeState)
                oldInputState.password.type = 'text'
                setSignupInputState(oldInputState)
            }

        } else {
            if (passwordEyeState.repeatPasswordEyeIcon == 'bi bi-eye') {
                oldEyeState.repeatPasswordEyeIcon = 'bi bi-eye-slash'
                passwordEyeSetState(oldEyeState)
                oldInputState.passwordRepeat.type = 'password'
                setSignupInputState(oldInputState)
            }
            else {
                oldEyeState.repeatPasswordEyeIcon = 'bi bi-eye'
                passwordEyeSetState(oldEyeState)
                oldInputState.passwordRepeat.type = 'text'
                setSignupInputState(oldInputState)
            }
        }

    }


    // sign up sending dataa to server
    const signup = () => {
        const checkEmail = signupInputState.email
        const checkPassword = signupInputState.password
        const checkPasswordRepeat = signupInputState.passwordRepeat
        console.log(checkPasswordRepeat.isValid, 'check email')
        if (checkPasswordValidation(checkEmail.value) == 'empty' || !checkEmail.isValid) {
            const holder = { ...signupInputState };
            holder.email.warningMessage = 'fill it'
            holder.email.isUsed = true
            holder.email.isValid = false
            setSignupInputState(holder)
            return
        }
        console.log(checkPassword, 'check pass')
        if (checkPasswordValidation(checkPassword.value) == 'short' || !checkPassword.isValid) {
            const holder = { ...signupInputState };
            holder.password.warningMessage = 'fill it'
            holder.password.isUsed = true
            holder.password.isValid = false
            setSignupInputState(holder)
            return
        }
        console.log(checkPasswordRepeat, 'check reap')
        if (checkPasswordValidation(checkPasswordRepeat.value) == 'empty' || !checkPasswordRepeat.isValid) {
            console.log('in pass repeat')
            const holder = { ...signupInputState };
            holder.passwordRepeat.warningMessage = 'fill it'
            holder.passwordRepeat.isUsed = true
            holder.passwordRepeat.isValid = false
            setSignupInputState(holder)
            return
        }

        // fetch("http://localhost:8080/spring").then((respone) => {
        //     console.log(respone.json())
        // })


    }


    let signUpInputArray = []
    for (let x in signupInputState) {
        signUpInputArray.push({
            id: x,
            config: signupInputState[x]
        })
    }

    return (
        <Transition timeout={1500} in={true} appear>
            {(status) => (
                <div className={`login-container signup-${status}`}>
                    <form className="signup" method="post">
                        <h2>Signup</h2>
                        {signUpInputArray.map((item) => {
                            return (
                                <>
                                    {(item.config.name != 'email') ?
                                        <Button btnType={'show-password'} click={() => (eyeBtnHandler(item.config.name))}>
                                            <i className={(item.config.name == 'password') ?
                                                passwordEyeState.passwordEyeIcon : passwordEyeState.repeatPasswordEyeIcon}></i>
                                        </Button> : null}
                                    <Input
                                        type={item.config.type}
                                        name={item.config.type}
                                        placeholder={item.config.placeholder}
                                        value={item.config.value}
                                        isValid={item.config.isValid}
                                        isUsed={item.config.isUsed}
                                        key={item.id}
                                        change={(event) => changeSignupHandler(event, item.id)}
                                        warningMessage={item.config.warningMessage}
                                    />

                                </>
                            )
                        })}
                        <Button btnType={"success"} click={signup}>Signup</Button>
                        <Link to="/login" className="already-account">Already have account?</Link>
                    </form>
                </div>
            )}




        </Transition>

    )
}

export default Signup