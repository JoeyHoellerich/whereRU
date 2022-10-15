// dependencies
let results = require('./dummyData')
let dummyPhotoUrl = "https://lh3.googleusercontent.com/places/AM5lPC-_-iZC51imMYwMKbZxClNluv7ogHlo3-bobPkaPaTbpcyJIjX-CyTagttVeBXIp2B96IzeXYf2YhhWt5Mp9XoqASbMQqFi_FQ=s1600-w1200"
let dummyPhotoArr = require("./dummyPhotos")

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var axios = require('axios')
const { XMLParser }  = require('fast-xml-parser')

const app = express()
const parser = new XMLParser();

// middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded( { extended: true }))
app.use(bodyParser.json())

// Controller for the API
app.use('/api', require("./controllers/api"))



// app.get('/', async (req, res) => {
//     // In case server is down, get base coords for latitiude/longitude
//     let latRange = [25, 49] // Positve for US
//     let longRange = [67, 124] // Negative for US

//     let latGuess = (Math.random() * (latRange[1] - latRange[0]) + latRange[0]).toFixed(4)
//     let longGuess = -1 * (Math.random() * (longRange[1] - longRange[0]) + longRange[0]).toFixed(4)

//     console.log(latGuess, longGuess)

//     // Get random lat/long coordinates to look for
//     let randomCoords = {
//         method: 'get',
//         url: 'https://api.3geonames.org/?randomland=yes'
//     }

//     axios(randomCoords)
//     .then((res) => {
//         let results = parser.parse(res.data)
//         latGuess = results['geodata']['nearest'].latt
//         longGuess = results['geodata']['nearest'].longt
//         console.log(latGuess, longGuess)
//     }).catch(() => {
//         console.log("server overload")
//     }) 

//     // Code for getting information from google map data (input latLong)
//     // var config = {
//         //     method: 'get',
//         //     url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLong}&rankby=distance&key=${process.env.PLACES_API}`,
//         // }
//         // axios(config)
//         // .then((res) => {
//             //     let results = JSON.stringify(res.data)
//             //     let location = results.results[0].geometry
//             // })
//             // .catch((e) => {
//                 //     console.log(error)
//             // })

//     // pull location data from the google result
//     let location = results.results[0].geometry.location
//     let lat = location.lat
//     let long = location.lng

//     // pull placeId from google result
//     let placeID = results.results[0].place_id
    
//     // pull photo reference from google result
//     let photoId = results.results[0].photos[0].photo_reference

//     // Code for getting additional place photos
//     // let getPlace = {
//     //     method : 'get',
//     //     url : `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=photos&key=${process.env.PLACES_API}`
//     // }
    
//     // let detailResults = await axios(getPlace)
//     // let photoRefArr = detailResults.data.result.photos
    
//     // Code for getting the image from google
//     // let getPhoto = {
//     //     method: 'get',
//     //     url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${photoId}&sensor=false&key=${process.env.PLACES_API}`
//     // }

//     // let photoResults = await axios(getPhoto)
//     // let photoURL = photoResults['request']['res']['responseUrl']

//     let photoURL = dummyPhotoUrl
//     res.send(photoURL)


// })

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})