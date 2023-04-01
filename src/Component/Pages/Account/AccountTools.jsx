import React, { useState, useEffect } from 'react'
import "./AccountTools.css"
import Button from '../../UI/Button/Button'
import ApiUrls from '../../../Constants/ApiUrls'
import useFetch from "../../../Hook/useFetch"

function AccountSettings() {
    const { data, error, loading, setData } = useFetch(ApiUrls.hostName + ApiUrls.users.getUser, {
        headers: {
            "Authorization": localStorage.getItem("accessToken")
        }
    })
    console.log(data)
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        if (data) {
            setInputs({
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                dob: data.dob ? data.dob : "0000-00-00",
                location: data.location ? data.location : ""
            })
        }


    }, [data])


    const inputNames = {
        NAME: 'NAME',
        LASTNAME: 'LASTNAME',
        EMAIL: 'EMAIL',
        DOB: 'DOB',
        LOCATION: 'LOCATION'
    }

    const inputHandler = (e, name) => {
        switch (name) {
            case inputNames.NAME: {
                setInputs({
                    ...inputs,
                    name: e.target.value
                })
                break;
            }
            case inputNames.LASTNAME: {
                setInputs({
                    ...inputs,
                    lastName: e.target.value
                })
                break;
            }
            case inputNames.EMAIL: {
                setInputs({
                    ...inputs,
                    email: e.target.value
                })
                break;
            }
            case inputNames.DOB: {
                setInputs({
                    ...inputs,
                    dob: e.target.value
                })
                break;
            }
            case inputNames.LOCATION: {
                setInputs({
                    ...inputs,
                    location: e.target.value
                })
                break;
            }
            default:
                break;
        }
    }

    const fetchData = () => {
        const formData = new FormData();
        for (let item in inputs) {
            //  console.log(inputs[item])
            formData.append(item + "", inputs[item])
            console.log(item + " : ", inputs[item])
        }
        formData.append("image", "image/png")

        fetch("http://localhost:8080/api/users", {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem("accessToken")
            },
            body: formData
        }).then(res => res).then(data => console.log(data))
    }

    return (
        <div className='account-tools'>
            <h2>Account Settings</h2>
            <section className='account-setting'>
                <form>
                    <div className='input-group'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input
                                type='text'
                                value={inputs.name}
                                placeholder='name'
                                onChange={(e) => inputHandler(e, inputNames.NAME)}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                value={inputs.lastName}
                                placeholder='last name'
                                onChange={(e) => inputHandler(e, inputNames.LASTNAME)}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='email'
                                value={inputs.email}
                                placeholder='name'
                                onChange={(e) => inputHandler(e, inputNames.EMAIL)}
                            />
                        </div>
                    </div>

                    <div className='input-group'>
                        <div className='input-container'>
                            <label>Location</label>
                            <input
                                type='text'
                                value={inputs.location}
                                placeholder='location'
                                onChange={(e) => inputHandler(e, inputNames.LOCATION)}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Date of birth</label>
                            <input
                                type='date'
                                value={inputs.dob}
                                placeholder='data of birth'
                                onChange={(e) => inputHandler(e, inputNames.DOB)}
                            />
                        </div>
                    </div>

                </form>
                <div className='button-container'>
                    <Button btnType="success" click={fetchData}>Update</Button>
                    <Button btnType="white">Cancel</Button>
                </div>
            </section>
        </div>
    )
}


function Password() {
    return (
        <div className='account-tools'>
            <h2>Password Settings</h2>
        </div>
    )
}

function Security() {
    return (
        <div className='account-tools'>
            <h2>Security Settings</h2>
        </div>
    )
}

function Notification() {
    return (
        <div className='account-tools'>
            <h2>Notification Settings</h2>
        </div>
    )
}



const AccountTools = [AccountSettings, Password, Security, Notification]
export default AccountTools