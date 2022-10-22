import React, {useContext} from "react";
import logoTitle from "../imgs/whereRU_title.svg"
import { Link } from "react-router-dom"
import { CurrentUser } from "../context/CurrentUser";
import { useNavigate } from 'react-router'

function Nav(){
    const { currentUser } = useContext(CurrentUser)
    const navigate = useNavigate()

    let signOut = (e) => {
        localStorage.removeItem('token')
        navigate("/")
        window.location.reload(false)
    }

    let loginActions = (
        <>
            <Link to="/login">
                    <button>Login</button>
            </Link>
            <Link to="/signup">
                    <button>Sign Up</button>
            </Link>
        </>
    )

    let welcomeMessage = (
        <>
        </>
    )


    if (currentUser) {
        loginActions = (
        <>
            <Link to="/">
                    <button onClick={signOut}>Sign Out</button>
            </Link>
        </>
        )

        welcomeMessage = (
            <>
                <h3>Welcome {currentUser.username}!</h3>
            </>
        )
    }
    return (
        <div className="navContainer">
            <div className="logoContainer">
                <Link to="/">
                    <img src={logoTitle} alt = "where r u"/>
                </Link>
                {welcomeMessage}
            </div>
            <div className="btnNavContainer">
                {currentUser 
                    ? 
                    <Link to="/play">
                        <button>Play</button>
                    </Link>
                    :
                    <Link to="/login">
                        <button>Play</button>
                    </Link>
                }
                {loginActions}
            </div>

        </div>
    )
}

export default Nav