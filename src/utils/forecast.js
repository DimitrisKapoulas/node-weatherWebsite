const request = require('postman-request')
const {
    callbackify
} = require('util')

const forecast = (cityName, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4be50a90e41bde38f8d2319732f575d3&query=' + encodeURIComponent(cityName)

    request({
        url,
        json: true
    }, (error, {body}) => {
        //     // const data = JSON.parse(response.body)
        //     // console.log(data.current)
        if (error) {
            //console.log('Unable to connect to weather service!')
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            //console.log('Please specify a valid location identifier using the query parameter.')
            callback('Please specify a valid location identifier using the query parameter.', undefined)
        } else {
            //console.log(response.body.current)
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
            //console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' out. But it feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast