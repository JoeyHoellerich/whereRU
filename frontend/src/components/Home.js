import React, {useContext} from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/whereRU_logo.svg"
import {CurrentUser} from "../context/CurrentUser"



function Home(){

    const {currentUser} = useContext(CurrentUser)

    return (
        <div className="homeContainer">
            <div>
                <h2>Welcome to Where R U</h2>
                <p>Take a tour around the globe and find out how well you can discern your surroundings.</p>
                {
                    currentUser 
                    ?
                    <Link to = "/play">
                        <button className="btn">Take a Trip!</button>
                    </Link>
                    :
                    <Link to = "/login">
                        <button className="btn">Take a Trip!</button>
                    </Link>
                }
            </div>
            <img src = {logo} alt="logo"/>
        </div>
    )

}

export default Home