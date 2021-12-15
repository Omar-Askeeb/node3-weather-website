const request = require('request')
// forecast(-75.7088, 44.1545, (error, data)
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f852c00e245c44e0c2582837b4af1c11&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.success == false) {
            callback('Unable to find weather, Try other search', undefined)
        } else {
            callback(undefined, {
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature
            })
        }
    })
}

module.exports = forecast