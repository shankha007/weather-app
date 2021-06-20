const request = require('request');
const api = require('../api.json');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=' + api.WeatherAPI + '&q='
        + latitude + ',' + longitude + '&days=7';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined);
        } else if (body.error) {
            callback(body.error.message, undefined);
        } else {
            const data = {
                temp: body.current.temp_c,
                summary: body.current.condition.text,
                condition: body.forecast.forecastday[0].day.condition.text
            };
            callback(undefined, 'It is ' + data.temp + ' degree celcius out here. There is a possibility of '
                + data.summary + '. ' + data.condition + '.');
        }
    });
}

module.exports = forecast;