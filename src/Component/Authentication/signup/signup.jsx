import React, { useState } from 'react'
import "../Login/Login.css"
import Input from "../../UI/Input/Input"
import Button from '../../UI/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import { actions } from '../../../reducer'


const Signup = () => {
    const navigate = useNavigate();
    const [, dispatch] = useStateValue();
    const [passwordEyeState, passwordEyeSetState] = useState({
        passwordEyeIcon: 'bi bi-eye-slash', repeatPasswordEyeIcon: 'bi bi-eye-slash'
    })
    const [signupInputState, setSignupInputState] = useState({
        image: {
            type: 'file',
            placeholder: 'image',
            name: 'image',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        },
        name: {
            type: 'text',
            placeholder: 'name',
            name: 'name',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        },
        lastName: {
            type: 'text',
            placeholder: 'last name',
            name: 'lastName',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        },
        dob: {
            type: 'date',
            placeholder: 'date of birth',
            name: 'dob',
            value: '',
            isValid: false,
            isUsed: false,
            warningMessage: ''
        },
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
        if (item === "image") {
            updatedElement.value = event.target.files[0]
            if (updatedElement.value) {
                updatedElement.isValid = true;
                updatedElement.warningMessage = "";
            } else {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'invalid value'
            }
            updatedForm[item] = updatedElement
            setSignupInputState(updatedForm)
            return;
        }
        if (item === "name" || item === "lastName") {
            if (updatedElement.value.length >= 2) {
                updatedElement.isValid = true;
                updatedElement.warningMessage = "";
            } else {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'invalid value'
            }
        }
        if (item === "dob") {
            if (updatedElement.value.length >= 0) {
                updatedElement.isValid = true;
                updatedElement.warningMessage = "";
            } else {
                updatedElement.isValid = false
                updatedElement.warningMessage = 'invalid value'
            }
        }
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
            } else if (updatedElement.value === updatedForm['passwordRepeat'].value) {
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


    // sign up sending data to server
    const signup = () => {
        const name = signupInputState.name;
        const lastName = signupInputState.lastName
        const dob = signupInputState.dob
        const email = signupInputState.email
        const password = signupInputState.password
        const passwordRepeat = signupInputState.passwordRepeat

        if (!name.isValid || !lastName.isValid || !dob.isValid) {
            return;
        }
        if (checkPasswordValidation(email.value) == 'empty' || !email.isValid) {
            const holder = { ...signupInputState };
            holder.email.warningMessage = 'fill it'
            holder.email.isUsed = true
            holder.email.isValid = false
            setSignupInputState(holder)
            return
        }
        if (checkPasswordValidation(passwordRepeat.value) == 'short' || !passwordRepeat.isValid) {
            const holder = { ...signupInputState };
            holder.password.warningMessage = 'fill it'
            holder.password.isUsed = true
            holder.password.isValid = false
            setSignupInputState(holder)
            return
        }
        if (checkPasswordValidation(passwordRepeat.value) == 'empty' || !passwordRepeat.isValid) {
            console.log('in pass repeat')
            const holder = { ...signupInputState };
            holder.passwordRepeat.warningMessage = 'fill it'
            holder.passwordRepeat.isUsed = true
            holder.passwordRepeat.isValid = false
            setSignupInputState(holder)
            return
        }
        const formData = new FormData();
        for (let item in signupInputState) {
            formData.append(item + "", signupInputState[item].value)
        }
        fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log("successfully added")
                return res.json();
            }
        }).then(data => {
            console.log(data)
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("name", data.userInformationDTO?.name)
            localStorage.setItem("lastName", data.userInformationDTO?.lastName)
            localStorage.setItem("email", data.userInformationDTO?.email)
            localStorage.setItem("image",data.userInformationDTO?.image)
            localStorage.setItem("roles", data.userInformationDTO?.roles)
            //console.log(localStorage.getItem("roles"))

            dispatch({
                type: actions.ADD_USER_INFORMATION,
                item: {
                    ...data.userInformationDTO,
                    accessToken: data.accessToken,
                }
            })
            navigate("/")
        }).catch(error => {
            console.log(error)
        })

    }


    let signUpInputArray = []
    for (let x in signupInputState) {
        signUpInputArray.push({
            id: x,
            config: signupInputState[x]
        })
    }

    return (
        <div className={`login-container signup-entering`}>
            <Link to="/">
                <img className='eshop-logo' src='/image/eshop-logo.png' />
            </Link>
            <form className="signup" method="post">
                <h2>Signup</h2>
                {signUpInputArray.map((item) => {
                    return (
                        <>
                            {(item.config.name === 'password' || item.config.name === 'passwordRepeat') ?
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
                <p>By clicking the sign up you agree to the <strong>eshop</strong> Conditions of Use & Sale</p>
                <Link to="/login" className="already-account">Already have account?</Link>
            </form>
        </div>


    )
}

export default Signup