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

    let findDistance = (lat1, lat2, long1, long2) => {
        lat1 = lat1 * Math.PI / 180
        lat2 = lat2 * Math.PI / 180
        long1 = long1 * Math.PI / 180
        long2 = long2 * Math.PI / 180

        // formula for finding distance between two lat/long points
        let dlat = lat2 - lat1
        let dlong = long2 - long1

        let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong /2), 2)
        let c = 2 * Math.asin(Math.sqrt(a))
        // radius of the earth in miles
        let r = 3956

        return Math.round(c*r)
    }

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
                    <p>The real location was: {placeObj.name}
                    <br />
                    Roughly {findDistance(guess[0], placeObj.lat, guess[1], placeObj.long)} miles away.
                    </p>
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