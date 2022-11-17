# whereRU

## Description
Where R U is a full stack application that allows users to do their best to guess the correct geographic location based on the pictures provided. 

## Tools Used
- Mongo DB
- Express
- Node.js
- React.js
- Google Places API
- Bcrypt (password hashing)
- JSON Web Tokens (store user login credentials across pages)

## How to Use
Before you can begin using the application, you first need to sign up. Where R U does not require email verification, so it is reccommended to use a username that is different than your email address.

After creating an account, log in and select the "Play" button from the top navigation bar, or select the "Take a Trip" button on the home page. 

The application will provide up to 10 images to assist you in guessing the correct location. Use the arrows at the top left and right corners of the image to cycle through the various photos. 

Use the map on the right to zoom in and select your best guess for the location. After you are confident in your guesss, select the "Guess" button to submit your response.

The actual location will be displayed with a green marker, and the distance between your guess and the marker will be displayed above the map. 

Click "Play Again" to play again. 

## Current State
- All locations are currently located in the United States.

## Webpage location
https://where-r-u-joeyhoellerich.herokuapp.com 

(side note) This webpage will only be avaliable until 11/27/22, when heroku begins charging for dynos. 
