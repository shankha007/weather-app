const request = require('request');
const api = require('../api.json');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
        + '.json?access_token=' + api.MapboxAPI + '&limit=1';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Mapbox Geolocation!', undefined);
        } else if (body.features.length === 0) {
            callback('No matching location!', undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            };
            callback(undefined, data);
        }
    });
}

module.exports = geocode;