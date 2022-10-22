import React, {useContext, useState} from "react";
import logo from "../imgs/whereRU_logo.svg"
import { CurrentUser } from "../context/CurrentUser"
import {useNavigate} from "react-router"

function Login(){
    const navigate = useNavigate()

    const { setCurrentUser } = useContext(CurrentUser)

    let [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    let [invalidCombo, setInvalidCombo] = useState(false)

    let updateForm = (value) => {
        if (invalidCombo && value === {password: ""}){
            setInvalidCombo(false)
        }
        return setCredentials((prev) => {
            return {...prev, ...value}
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify(credentials))
        const response = await fetch(`http://localhost:5000/api/users/authentication`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (response.status === 200){
            setCurrentUser(data.username)
            localStorage.setItem('token', data.token)
            navigate("/")
            window.location.reload(false)
        } else {
            setInvalidCombo(true)
        }
    }

    return(
        <div className="loginContainer">
            <div>
                <h2>Log In</h2> 
                <form>
                    <label htmlFor="username">Username: </label>
                    <br/>
                    <input 
                        type="text" 
                        name="username"
                        value = {credentials.username}
                        onChange = {(e) => updateForm({username: e.target.value})}
                        >
                    </input> 
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <br/>
                    <input 
                        type="password" 
                        name="password"
                        value = {credentials.password}
                        onChange = {e => updateForm({password: e.target.value})}
                        >
                    </input> 
                    <br/>
                    <button type="submit" onClick={handleSubmit}>Log In</button>
                    {invalidCombo ? <p>Invalid Username or Password. Please try again, or make an account</p> : <></>}
                </form>
            </div>
            <img  src = {logo} alt="logo"/>

        </div>
    )
}

export default Login