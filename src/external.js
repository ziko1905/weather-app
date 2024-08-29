// Import only needed during development
import { checkSearch } from "."

export function getWeather(place, add) {
    return new Promise(function(resolve) {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=7NYE8W9EYLGFYL8YU67GRTJAA` + add)
        .then(data => data.json())
        .then(response => {
            resolve(response)
        }).catch(error => checkSearch(error))
    })
        
    // Commented to not ask to many GET requests during development
    // Instead use json:
    return new Promise(function(resolve) {
        fetch(require("./zagreb.json"))
        .then(data => data.json())
        .then(response => {
            resolve(response)
        })
    })
}