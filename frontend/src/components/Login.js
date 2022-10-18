import React, {useState} from "react";
import logo from "../imgs/whereRU_logo.svg"

function Login(){

    let [currentUser, setCurrentUser] = useState({
        username: "",
        password: ""
    })

    let [invalidCombo, setInvalidCombo] = useState(false)

    let updateForm = (value) => {
        if (invalidCombo && value === {password: ""}){
            setInvalidCombo(false)
        }
        return setCurrentUser((prev) => {
            return {...prev, ...value}
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        setInvalidCombo(true)
        console.log(currentUser)
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
                        value = {currentUser.username}
                        onChange = {(e) => updateForm({username: e.target.value})}
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