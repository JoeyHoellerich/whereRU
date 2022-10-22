import React, {useState, useEffect} from 'react'
import MapComponent from './Map'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Play(){
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/places`)
            const resData = await response.json()
            setPlaceObj(resData)
        }
        fetchData()
    }, [])

    const [isSubmit, setIsSubmit] = useState(false)
    const [guess, setGuess] = useState(null)
    let [placeObj, setPlaceObj] = useState(null)



    let handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmit(true)
    }

    let playAgain = (e) => {
        window.location.reload(false)
    }

    return (
        <div className='playContainer'>
            <div className='photoContainer'>
                {!placeObj 
                    ?
                    <p>Loading Photos...</p>
                    :
                    <Carousel>
                        {placeObj.photos.map((el, index) => {
                            return (
                                <div>
                                    <img src={el} alt = "place"/>
                                </div>
                            )
                        })}
                    </Carousel>
                }
            </div>
            <div className='mapContainer'>
                {!isSubmit 
                    ? 
                    <p>Use the map below to select your best guess for where the location is. Hit the guess button to submit your answer!</p>
                    :
                    <p>The real location was: {placeObj.name}<br />Roughly $num away</p>
                }
                {guess?.length > 0 && !isSubmit 
                    ? 
                    <button onClick={handleSubmit}>Guess!</button> 
                    : 
                    <></>
                }
                {isSubmit 
                    ? 
                    <button onClick={playAgain}>Play Again?</button> 
                    : 
                    <></>
                }
                <MapComponent setGuess = {setGuess} isSubmit = {isSubmit} placeObj = {placeObj}/>
            </div>
        </div>
    )
}

export default Play