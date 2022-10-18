import React from "react";
import logo from "../imgs/whereRU_logo.svg"

function Login(){

    return(
        <div className="loginContainer">
            <div>
                <h2>Log In</h2> 
                <form>
                    <label htmlFor="username">Username: </label>
                    <br/>
                    <input type="text" name="username"></input> 
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <br/>
                    <input type="password" name="password"></input> 
                    <br/>
                    <button type="submit">Log In</button>
                </form>
            </div>
            <img  src = {logo} alt="logo"/>

        </div>
    )
}

export default Login