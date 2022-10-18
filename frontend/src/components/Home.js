import React from "react";
import logo from "../imgs/whereRU_logo.svg"



function Home(){

    return (
        <div className="homeContainer">
            <div>
                <h2>Welcome to Where R U</h2>
                <p>Take a tour around the globe and find out how well you can discern your surroundings.</p>
                <button className="btn">Take a Trip!</button>
            </div>
            <img src = {logo} alt="logo"/>
        </div>
    )

}

export default Home