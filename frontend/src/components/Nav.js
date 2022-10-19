import React from "react";
import logoTitle from "../imgs/whereRU_title.svg"
import { Link } from "react-router-dom"

function Nav(){
    return (
        <div className="navContainer">
            <div>
                <Link to="/">
                    <img src={logoTitle} alt = "where r u"/>
                </Link>
            </div>
            <div className="btnNavContainer">
                <Link to="/play">
                    <button>Play</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>

        </div>
    )
}

export default Nav