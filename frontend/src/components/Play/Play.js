import React, {useState} from 'react'
import MapComponent from './Map'

function Play(){

    const [isSubmit, setIsSubmit] = useState(false)
    const [guess, setGuess] = useState(null)

    let handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmit(true)
    }

    let playAgain = (e) => {
        window.location.reload(false)
    }

    return (
        <div className='playContainer'>
            <div>
                <p>Paragraph of text</p>
                {guess?.length > 0 && !isSubmit ? <button onClick={handleSubmit}>Guess!</button> : <></>}
                {isSubmit ? <button onClick={playAgain}>Play Again?</button> : <></>}
            </div>
            <div>
                <MapComponent setGuess = {setGuess} isSubmit = {isSubmit}/>
            </div>
        </div>
    )
}

export default Play