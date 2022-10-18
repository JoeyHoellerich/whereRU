import React, {useState} from "react";
import logo from "../imgs/whereRU_logo.svg"

function SignUp(){

    let [currentUser, setCurrentUser] = useState({
        username: "",
        password: ""
    })

    let [invalidName, setInvalidName] = useState(false)

    let updateForm = (value) => {
        return setCurrentUser((prev) => {
            return {...prev, ...value}
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        if (currentUser.username === "" || currentUser.password === ""){
            setInvalidName(true)
        }
        console.log(currentUser)
    }

    return(
        <div className="loginContainer">
            <div>
                <h2>Sign Up</h2> 
                <form>
                    <label htmlFor="username">Username: </label>
                    <br/>
                    <input
                        type="text" 
                        name="username"
                        value = {currentUser.username}
                        onChange = {e => updateForm({username: e.target.value})}
                        required = {true}
                        minLength={5}
                        >
                    </input> 
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <br/>
                    <input
                        type="password" 
                        name="password"
                        value = {currentUser.password}
                        onChange = {e => updateForm({password: e.target.value})}
                        required = {true}
                        minLength={5}
                        >
                    </input> 
                    <br/>
                    <button type="submit" onClick={handleSubmit}>Create Account</button>
                </form>
                {invalidName ? <p>This username has already been taken</p> : <></>}
            </div>
            <img  src = {logo} alt="logo"/>

        </div>
    )
}

export default SignUp