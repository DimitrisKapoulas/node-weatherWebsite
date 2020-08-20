const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2Fwb3VsYXNkIiwiYSI6ImNrZDVvcXZ2aTBqM2syc256aGl5Y2ZvYTgifQ.Fip4EHaIRFgK0WiehXjgUw&limit=1'
    request({url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined, {
            latitude : body.features[0].center[1],
            longtitude : body.features[0].center[0],
            cityName : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode