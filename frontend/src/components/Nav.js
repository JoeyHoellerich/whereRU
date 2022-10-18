import React from "react";
import logoTitle from "../imgs/whereRU_title.svg"

function Nav(){
    return (
        <div className="navContainer">
            <div>
                <img src={logoTitle} alt = "where r u"/>
            </div>
            <div className="btnNavContainer">
                <button>Play</button>
                <button>Login</button>
                <button>Sign Up</button>
            </div>

        </div>
    )
}

export default Nav