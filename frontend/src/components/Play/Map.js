import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { useMapEvents } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from "../../imgs/marker-icon.png"
import trueIcon from "../../imgs/green-marker-icon.png"


function MapControl(props) {
    useMapEvents({
        click: (e) => {
            let latlng = e.latlng
            let result = [latlng.lat, latlng.lng]
            props.setMarkers([result])
            props.setGuess(result)
        }
    })
    return null
}

function MapComponent(props){

    let [markers, setMarkers] = useState([])

    if (props.placeObj){
        var truePosition = [props.placeObj.lat, props.placeObj.long]
    } else {
        truePosition = [0,0]
    }

    const newIcon = new L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconSize: [25,41],
        shadowSize: [50, 64],
        iconAnchor: [12, 41],
        shadowAnchor: [4, 62],
        popupAnchor: [0,-45]
    })

    const greenIcon = new L.icon({
        iconUrl: trueIcon,
        iconRetinaUrl: trueIcon,
        iconSize: [25,41],
        shadowSize: [50, 64],
        iconAnchor: [12, 41],
        shadowAnchor: [4, 62],
        popupAnchor: [0,-45]
    })


    return (
        <MapContainer 
            center = {[0, 0]}
            event
            zoom={1}
            style={{width: '95%', height:'60vh', border: '3px solid #89A1EF', margin: '5px'}}
        >
            <MapControl setMarkers = {setMarkers} markers = {markers} setGuess = {props.setGuess}/>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {props.isSubmit ?
                    <Marker key={`marker-true`} position={truePosition} icon={greenIcon}>
                    <Popup>
                        {props.placeObj.name}
                    </Popup>
                    </Marker>
                : <></>}
                {markers.length > 0 ? markers.map((position, index) => {
                    return (
                        <Marker key={`marker-${index}`} position={position} icon={newIcon}>
                        <Popup>
                            {position[0]}, {position[1]}
                        </Popup>
                        </Marker>
                    )
                }): <></>}          
        </MapContainer>
    )
}

// ***** Basic Map Component with Marker + Popup **********
// function MapComponent() {

//     const newIcon = new L.icon({
//         iconUrl: icon,
//         iconRetinaUrl: icon,
//         iconSize: [25,41],
//         shadowSize: [50, 64],
//         iconAnchor: [12, 41],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3,-76]
//     })
//     let position = [51.505, -0.09]
//     return(
//         <MapContainer center={position} zoom={13} style={{width: '100%', height: '400px'}}>
//             <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position} icon={newIcon}>
//             <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//             </Marker>
//         </MapContainer>
//     )
// }

export default MapComponent