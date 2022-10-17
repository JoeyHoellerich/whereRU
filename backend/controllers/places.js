// Dummy Data
let results = require('../dummyData')
let dummyPhotoUrl = "https://lh3.googleusercontent.com/places/AM5lPC-_-iZC51imMYwMKbZxClNluv7ogHlo3-bobPkaPaTbpcyJIjX-CyTagttVeBXIp2B96IzeXYf2YhhWt5Mp9XoqASbMQqFi_FQ=s1600-w1200"
let dummyPhotoArr = require("../dummyPhotos")
let dummyPhotoUrls = require('../dummyPhotoURLs')

const places = require ('express').Router()

// middleware
var axios = require('axios')
const { XMLParser }  = require('fast-xml-parser')
const parser = new XMLParser();

// Database
const Place = require('../models/place')


places.get('/', async (req, res) => {
    // function that returns a random latitude and longitude
    function getRandomCoords(){
        let latRange = [25, 49] // Positve for US
        let longRange = [67, 124] // Negative for US
    
        let latGuess = (Math.random() * (latRange[1] - latRange[0]) + latRange[0]).toFixed(4)
        let longGuess = -1 * (Math.random() * (longRange[1] - longRange[0]) + longRange[0]).toFixed(4)
    
    
        // Get random lat/long coordinates to look for
        let randomCoords = {
            method: 'get',
            url: 'https://api.3geonames.org/?randomland=yes'
        }
    
        axios(randomCoords)
        .then((res) => {
            let results = parser.parse(res.data)
            latGuess = results['geodata']['nearest'].latt
            longGuess = results['geodata']['nearest'].longt
        }).catch(() => {
            console.log("server overload")
        }) 

        return {
            latGuess: latGuess,
            longGuess: longGuess
        }
    }

    let {latGuess, longGuess} = getRandomCoords()
    let latLong = `${latGuess}%2C${longGuess}`

    // function for getting information from google map data (input latLong)
    async function getPlace(urlLatLong){
        var config = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${urlLatLong}&rankby=distance&key=${process.env.PLACES_API}`,
            }
        let results = await axios(config)
        
        return {
            locationLat: results.results[0].geometry.location.lat,
            locationLong: results.results[0].geometry.location.lng,
            placeID: results.results[0].place_id,
            name: results.results[0].name
        }
    }

    let placeInfo = {
        locationLat: results.results[0].geometry.location.lat,
        locationLong: results.results[0].geometry.location.lng,
        placeID: results.results[0].place_id,
        name: results.results[0].name
    }


    // function for getting additional place photos
    async function getPhotoArr(urlPlaceID) {
        let getPlace = {
            method : 'get',
            url : `https://maps.googleapis.com/maps/api/place/details/json?place_id=${urlPlaceID}&fields=photos&key=${process.env.PLACES_API}`
        }
        
        let detailResults = await axios(getPlace)
        let photoRefArr = detailResults.data.result.photos
        return photoRefArr
    }
    
    // Function for getting one image URL from google
    async function getPhotoURL(urlPhotoID){
        let getPhoto = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${urlPhotoID}&sensor=false&key=${process.env.PLACES_API}`
        }
    
        let photoResults = await axios(getPhoto)
        let photoURL = photoResults['request']['res']['responseUrl']
        return photoURL
    }

    // Function to get array of photo URLs
    async function getPhotoURLArr(photoArr){
        let returnedURLs = [];

        for (let i = 0; i < photoArr.length; i++){
            let photoURL = await getPhotoURL(photoArr[i].photo_reference)
            returnedURLs.push(photoURL)    
        }

        return returnedURLs
    }

    //let returnedURLs = await getPhotoURLArr(dummyPhotoArr)
    let returnedURLs = dummyPhotoUrls

    let placeObj = {
        placeId: placeInfo.placeID,
        name:placeInfo.name,
        lat: placeInfo.locationLat,
        long: placeInfo.locationLong,
        photos: returnedURLs
    }

    // function to post place information to place Database
    async function postPlace(placeObj){
        // check to see if record exists in database
        let doesExist = await Place.exists({placeId: placeObj.placeId})

        // if the record does not exist, create a new one
        if (!doesExist) {
            Place.create({
                placeId: placeObj.placeId,
                name: placeObj.name,
                lat: placeObj.lat,
                long: placeObj.long,
                photos: placeObj.photos
            }).catch(err => console.log(err))
        }

    }

    // add place to database
    postPlace(placeObj)

    // return the placeObject to client
    res.send(placeObj)

})


module.exports = places