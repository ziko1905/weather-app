export function getWeather(place) {
    return new Promise(function(resolve) {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=7NYE8W9EYLGFYL8YU67GRTJAA`)
        .then(data => data.json())
        .then(response => {
            console.log(response)
            resolve()
        })
    })
}